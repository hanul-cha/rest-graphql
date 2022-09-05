import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLEnumType, GraphQLObjectType } from 'graphql'
import { GraphQLString } from 'graphql'

export enum SnsType {
  Kakao = 'kakao',
  Facebook = 'facebook',
  Instagram = 'instagram',
}

export const GraphQLSnsType = new GraphQLEnumType({
  name: 'SnsType',
  values: {
    Kakao: {
      value: SnsType.Kakao,
    },
    Facebook: {
      value: SnsType.Facebook,
    },
    Instagram: {
      value: SnsType.Instagram,
    },
  },
})

export interface AuthSns {
  type: SnsType
  url: string
}

export const GraphQLAuthSns = new GraphQLObjectType({
  name: 'AuthSns',
  fields: () => ({
    type: { type: GraphQLSnsType },
    url: { type: GraphQLString },
  }),
})

@ObjectType()
export class AuthSnsImpl implements AuthSns {
  @Field()
  type: SnsType

  @Field()
  url: string
}
