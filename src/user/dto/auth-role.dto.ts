import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { GraphQLEnumType } from 'graphql'

export enum AuthRole {
  ADMIN_USER = 'admin::user', // 일반사용자
  ADMIN_GUEST = 'admin::guest',
  ADMIN_DEVELOPER = 'admin::developer', // 개발자 (전체권한)
}

export const GraphQLAuthRole = new GraphQLEnumType({
  name: 'AuthRole',
  values: {
    ADMIN_USER: {
      value: AuthRole.ADMIN_USER,
      description: '일반사용자(box app사용자)',
    },
    ADMIN_UNKNOWN: {
      value: AuthRole.ADMIN_GUEST,
      description: '일반사용자(admin)',
    },
    ADMIN_DEVELOPER: {
      value: AuthRole.ADMIN_DEVELOPER,
      description: '개발자(전체권한)',
    },
  },
})

@InputType()
export class AuthInput {
  @Field()
  roles: AuthRole

  @Field()
  userId: string
}

registerEnumType(AuthRole, { name: 'AuthRole' })
