import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthRole } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createUser(createAuthDto: CreateAuthInput): Promise<User> {
    const { userId, password, name, address } = createAuthDto;
    const user = this.UserRepository.create({
      userId,
      password,
      name,
      address,
      roles: [AuthRole.ADMIN_GUEST],
    });
    await this.UserRepository.save(user);

    return user;
  }
}
