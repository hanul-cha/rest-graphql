import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthRole } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { SignInAuthInput } from './dto/signIn-auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createUser(createAuthDto: CreateAuthInput): Promise<User> {
    const { userId, password, name, address } = createAuthDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.UserRepository.create({
      userId,
      password: hashedPassword,
      name,
      address,
      roles: [AuthRole.ADMIN_GUEST],
    });

    try {
      await this.UserRepository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new GraphQLError('Existing userid');
      }
    }

    return user;
  }

  async signIn(signInAuthInput: SignInAuthInput): Promise<string> {
    const { userId, password } = signInAuthInput;
    const user = await this.UserRepository.findOne({ userId });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      return 'login failed';
    }
  }
}
