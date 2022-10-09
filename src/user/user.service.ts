import { Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { AuthInput, AuthRole } from './dto/auth-role.dto'
import { CreateAuthInput } from './dto/create-auth-credential.dto'
import * as bcrypt from 'bcryptjs'
import { SignInAuthInput } from './dto/signIn-auth-credential.dto'
import { JwtService } from '@nestjs/jwt'
import { ApolloError } from 'apollo-server-express'
import { ContractRepository } from 'src/contract/contract.repository'
import { UserRepository } from './user.repository'
import { SourceToken } from 'src/sourceToken'

@Injectable()
export class UserService {
  constructor(
    @Inject(SourceToken.User)
    private userRepository: UserRepository,
    @Inject(SourceToken.Contract)
    private contractRepository: ContractRepository,
    private jwtService: JwtService,
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })
    if (!user) {
      throw new ApolloError('아이디 또는 패스워드를 확인해 주세요')
    }
    return user
  }

  async createUser(input: CreateAuthInput): Promise<User> {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(input.password, salt)

    const user = this.userRepository.create({
      ...input,
      password: hashedPassword,
      roles: [AuthRole.ADMIN_USER],
    })

    try {
      await this.userRepository.save(user)
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ApolloError('중복된 아이디 입니다.', 'ER_DUP_ENTRY')
      } else {
        throw new ApolloError(err)
      }
    }

    return user
  }

  async countContractByUserId(id: number): Promise<number> {
    const ContractQb = this.contractRepository.createQueryBuilder()
    ContractQb.where('contract.user_id = :id', { id })
    return await ContractQb.getCount()
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async addRoles(authInput: AuthInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        userId: authInput.userId,
      },
    })
    if (!user) {
      throw new ApolloError('존제하지 않는 계정입니다.')
    }
    if (user.roles) {
      user.roles.map((role) => {
        if (role === authInput.roles) {
          throw new ApolloError('This role has already been added')
        }
      })
      user.roles.push(authInput.roles)
    } else {
      user.roles = [authInput.roles]
    }
    return this.userRepository.save(user)
  }

  async signIn(signInAuthInput: SignInAuthInput): Promise<string> {
    const { userId, password } = signInAuthInput
    console.log('asdf', await this.userRepository.testWithUser())
    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, roles: user.roles, name: user.name }
      const accessToken = this.jwtService.sign(payload)
      return accessToken
    } else {
      throw new ApolloError(
        'login failed: unknown user or password',
        'LOGIN_FAILED',
      )
    }
  }
}
