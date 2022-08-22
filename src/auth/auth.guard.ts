import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApolloError } from 'apollo-server-express';

export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();

  //   const { authorization } = request.headers;

  //   if (authorization === undefined) {
  //     // throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
  //     throw new ApolloError('Token 전송 안됨', 'UNAUTHORIZED');
  //   }

  //   const token = authorization.replace('Bearer ', '');
  //   console.log(token);
  //   request.user = this.validateToken(token);
  //   return true;
  // }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log('gql simple context: ', context);
    // console.log(this.jwtService.verify(token, { secret: secretKey }));
    console.log('gqlContext: ', ctx.getContext().req.headers.authorization);
    return ctx.getContext().req;
  }
}
