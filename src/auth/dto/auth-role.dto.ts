import { Field, InputType } from '@nestjs/graphql';
import { GraphQLEnumType } from 'graphql';

export enum AuthRole {
  BOX_USER = 'box::user', // 일반사용자(box app사용자)

  //admin
  ADMIN_GUEST = 'admin::guest', // 일반사용자(admin)
  ADMIN_DEVELOPER = 'admin::developer', // 개발자 (전체권한)
}

export const GraphQLAuthRole = new GraphQLEnumType({
  name: 'AuthRole',
  values: {
    BOX_USER: {
      value: AuthRole.BOX_USER,
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
});

@InputType()
export class AuthInput {
  @Field()
  roles: AuthRole;

  @Field()
  userId: string;
}
