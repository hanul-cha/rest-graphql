import { applyDecorators, UseGuards } from '@nestjs/common'
import {
  Mutation,
  Query,
  QueryOptions,
  ReturnTypeFuncValue,
} from '@nestjs/graphql'
import { AuthRole } from 'src/user/dto/auth-role.dto'
import { GqlAuthGuard } from 'src/guard/auth.guard'
import { RolesGuard } from 'src/guard/role.guard'
import { Authorize } from './roles.decorator'

interface QueryOption {
  roles?: AuthRole | AuthRole[]
  return?: ReturnTypeFuncValue
  options?: QueryOptions
}

// GqlAuthGuard 가드는 홀로 사용 가능하지만 RolesGuard는 req.user를 넘겨주는 가드와 사용가능합니다.
export const GuardQuery = (option?: QueryOption) => {
  const query = () => {
    if (option) {
      if (option.return) {
        const returnOption = option.return
        return Query(() => {
          return returnOption
        }, option.options)
      }
    }
    return Query()
  }

  return applyDecorators(
    Authorize(option?.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    query(),
  )
}

export const GuardMutation = (option?: QueryOption) => {
  const mutation = () => {
    if (option) {
      if (option.return) {
        const returnOption = option.return
        return Mutation(() => {
          return returnOption
        }, option.options)
      }
    }
    return Mutation()
  }
  return applyDecorators(
    Authorize(option?.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    mutation(),
  )
}
