import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { GraphQLNonNull } from 'graphql';
import { Column } from 'typeorm';
import { AuthRole } from './auth-role.dto';

@InputType()
export class CreateMenuInput {
  @Field()
  userId!: string;

  @Field()
  password!: string;

  @Field()
  name?: string;

  @Field()
  address?: number;

  @Field(() => [AuthRole])
  @Column({ type: 'json' })
  roles!: AuthRole[] | null;
}
