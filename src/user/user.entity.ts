import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql'
import { GraphQLID, GraphQLString } from 'graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { AuthSns, AuthSnsImpl } from './user.type'
import { AuthSearchQuestion } from './dto/auth-search.dto'
import { AuthRole } from './dto/auth-role.dto'

@Entity()
@Unique(['userId'])
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => GraphQLID)
  id: number

  @Field(() => GraphQLString)
  @Column({ type: String, name: 'user_id' })
  userId: string

  @Field(() => GraphQLString)
  @Column({ type: String })
  password: string

  @Field(() => GraphQLString)
  @Column({ type: String })
  name: string

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: String,
    nullable: true,
    default: null,
  })
  contents: string | null

  @Field(() => GraphQLString, { nullable: true })
  @Column({ type: String, default: null })
  address: string | null

  @Field(() => AuthSnsImpl, { nullable: true })
  @Column({ type: 'json', default: null })
  sns: AuthSns[] | null

  @Column({
    type: 'json',
    default: null,
  })
  roles: AuthRole[] | null

  @Field(() => GraphQLString)
  @Column({
    type: String,
    name: 'question_for_search',
  })
  questionForSearch: AuthSearchQuestion

  @Field(() => GraphQLString)
  @Column({
    type: String,
    name: 'answer_for_search',
  })
  answerForSearch: string

  @Field(() => GraphQLTimestamp)
  @Column({
    type: 'timestamp',
    name: 'created_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: number

  @Column({
    type: 'timestamp',
    name: 'update_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: number
}
