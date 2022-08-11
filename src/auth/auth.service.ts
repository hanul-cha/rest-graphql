import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthInput, AuthRole } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { SignInAuthInput } from './dto/signIn-auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql/error';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser(id: number): Promise<User> {
    return this.UserRepository.findOne(id);
  }

  async createUser(createAuthDto: CreateAuthInput): Promise<User> {
    const {
      userId,
      password,
      name,
      address,
      questionForSearch,
      answerForSearch,
    } = createAuthDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.UserRepository.create({
      userId,
      password: hashedPassword,
      name,
      address,
      roles: [AuthRole.ADMIN_GUEST],
      questionForSearch,
      answerForSearch,
    });

    try {
      await this.UserRepository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ApolloError('중복된 아이디 입니다.', 'ER_DUP_ENTRY');
      }
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  async addRoles(authInput: AuthInput): Promise<User> {
    const user = await this.UserRepository.findOne({
      userId: authInput.userId,
    });
    user.roles.map((role) => {
      if (role === authInput.roles) {
        throw new ApolloError('This role has already been added');
      }
    });
    user.roles.push(authInput.roles);
    return this.UserRepository.save(user);
  }

  async signIn(signInAuthInput: SignInAuthInput): Promise<string> {
    const { userId, password } = signInAuthInput;
    const user = await this.UserRepository.findOne({ userId });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, roles: user.roles, name: user.name };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new ApolloError(
        'login failed: unknown user or password',
        'LOGIN_FAILED',
      );
    }
  }
}
