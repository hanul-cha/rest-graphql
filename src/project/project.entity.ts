import { Field, ID, ObjectType } from '@nestjs/graphql'
import { GraphQLInt, GraphQLString } from 'graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Field(() => GraphQLInt)
  @Column({ type: Number, name: 'create_user_id' })
  createUserId!: number

  @Field(() => GraphQLString)
  @Column({ type: String })
  title!: string

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: String,
    nullable: true,
    default: null,
  })
  contents: string | null // db type은 TEXT타입으로 해야함 (배포전 migration작성시 꼭 유의해야함)

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'start_date',
    nullable: true,
    default: null,
  })
  startDate: string | null

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'end_date',
    nullable: true,
    default: null,
  })
  endDate: string | null

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'dead_line',
    nullable: true,
    default: null,
  })
  deadLine: string | null

  @Field(() => GraphQLString, { nullable: true })
  @Column({
    type: String,
    name: 'open_link',
    nullable: true,
    default: null,
  })
  openLink: string | null

  @Field(() => GraphQLInt, { nullable: true })
  @Column({
    type: Number,
    name: 'maximum_user_length',
    nullable: true,
    default: null,
  })
  maximumUserLength: number | null

  @Field(() => GraphQLInt)
  @Column({
    type: Number,
    name: 'count_like',
    default: 0,
  })
  countLike: number

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
