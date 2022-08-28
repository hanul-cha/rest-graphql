import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../role/jwt.strategy';
import { UserRepository } from './auth.repository';
import { ContractRepository } from 'src/contract/contract.repository';

@Global()
@Module({
  imports: [
    PassportModule,
    // 토큰 생성시 필요한 옵션 당연히 시크릿 키랑 만료시간 둘다 env로 뺴야됨
    JwtModule.register({
      secret: 'SecretCode-4224',
      signOptions: {
        expiresIn: 3600 * 10,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, ContractRepository]),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
