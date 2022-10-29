import { Global, Module } from '@nestjs/common'
import { UserResolver } from './user.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../role/jwt.strategy'
import { userProvider } from './user.repository'
import { UserService } from './user.service'
import { contractProvider } from 'src/contract/contract.repository'

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
  ],
  providers: [
    UserService,
    UserResolver,
    JwtStrategy,
    ...userProvider,
    ...contractProvider,
  ],
  exports: [PassportModule, UserService],
})
export class UserModule {}
