import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { ApolloError } from 'apollo-server-express'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const authorization = ctx.getContext().req.headers.authorization

    if (!authorization) {
      throw new ApolloError('Token 전송 안됨', 'UNAUTHORIZED')
    }
    const token = authorization.replace('Bearer ', '')

    console.log(token)

    this.jwtService.verify(token, { secret: 'SecretCode-4224' })

    return ctx.getContext().req
  }

  //getRequest, canActivate
  /*
    canActivate는 검증만 진행할 뿐 JwtStrategy.validate를 실행시켜주지 않음
    내예상엔 JwtStrategy.validate에서 req.authorization에 접근하는데 여기서 req를 리턴안해주면
    찾지를 못하는듯 함
  */
}
