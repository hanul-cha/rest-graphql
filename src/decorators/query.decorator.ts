import { applyDecorators, UseGuards } from '@nestjs/common'
import {
  Mutation as normalMutation,
  Query as normalQuery,
  QueryOptions,
  ReturnTypeFuncValue,
} from '@nestjs/graphql'
import { RolesGuard } from 'src/guard/role.guard'
import { Authorize } from './roles.decorator'
import { GqlAuthGuard } from 'src/guard/auth.guard'
import { AuthRole } from 'src/user/dto/auth-role.dto'

interface QueryOption {
  roles?: AuthRole | AuthRole[]
  return?: ReturnTypeFuncValue
  options?: QueryOptions
}

// GqlAuthGuard 가드는 홀로 사용 가능하지만 RolesGuard는 req.user를 넘겨주는 가드와 사용가능합니다.
export const Query = (option?: QueryOption) => {
  const optionsQuery = () => {
    if (option && option.return) {
      const returnOption = option.return
      return normalQuery(() => {
        return returnOption
      }, option.options)
    }
    return normalQuery()
  }

  return applyDecorators(
    Authorize(option?.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    optionsQuery(),
  )
}

export const Mutation = (option?: QueryOption) => {
  const optionsMutation = () => {
    if (option && option.return) {
      const returnOption = option.return
      return normalMutation(() => {
        return returnOption
      }, option.options)
    }
    return normalMutation()
  }
  return applyDecorators(
    Authorize(option?.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    optionsMutation(),
  )
}
