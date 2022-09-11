import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthRole } from 'src/user/dto/auth-role.dto'

export interface ContextUser {
  id: number
  roles: AuthRole[]
  name: string
  iat: number
  exp: number
}

export const Ctx = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext().req.user
  },
)
