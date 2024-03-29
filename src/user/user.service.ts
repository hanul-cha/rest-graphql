import { Inject, Injectable } from '@nestjs/common'
import { CreateAuthInput } from './dto/create-auth-credential.dto'
import * as bcrypt from 'bcryptjs'
import { SourceToken } from 'src/utils/sourceToken'
import { SignInAuthInput } from './dto/signIn-auth-credential.dto'
import { JwtService } from '@nestjs/jwt'
import { ApolloError } from 'apollo-server-express'
import { UserRepository } from './user.repository'
import { AuthInput, AuthRole } from './dto/auth-role.dto'
import { User } from './user.entity'
import { ContractRepository } from 'src/contract/contract.repository'
import { ContractState } from 'src/contract/contract.type'

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
        throw new ApolloError('중복된 아이디 입니다.', 'ER_DUP_ENTRY') // TODO: 여기서 apollo에러를 던지면 안되지 ㄷㄷ... service는 apollo를 몰라야한다...
      } else {
        throw new ApolloError(err)
      }
    }

    return user
  }

  async countContractByUserId(
    id: number,
    states?: ContractState[] | null,
  ): Promise<number> {
    const ContractQb = this.contractRepository.createQueryBuilder()
    ContractQb.where('contract.user_id = :id', { id })
    if (states && states.length > 0) {
      ContractQb.andWhere('contract.state in :state', { states })
    }
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
