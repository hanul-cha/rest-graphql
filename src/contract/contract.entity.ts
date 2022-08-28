import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userId'])
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: String, name: 'user_id' })
  userId: string;

  @Field(() => String)
  @Column({ type: String })
  password: string;

  @Field(() => String)
  @Column({ type: String })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: String, default: null })
  address: string;

  @Column({
    type: 'json',
    default: null,
  })
  roles: AuthRole[] | null;

  @Field(() => String)
  @Column({
    type: String,
    name: 'question_for_search',
  })
  questionForSearch: AuthSearchQuestion;

  @Field(() => String)
  @Column({
    type: String,
    name: 'answer_for_search',
  })
  answerForSearch: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: number;

  @Column({
    type: 'timestamp',
    name: 'update_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: number;
}
