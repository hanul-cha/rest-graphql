import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { GraphQLNonNull } from 'graphql';
import { Column } from 'typeorm';
import { AuthRole } from './auth-role.dto';

@InputType()
export class CreateAuthInput {
  @Field()
  userId!: string;

  @Field()
  password!: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  address?: string;

  //   @Field(() => [AuthRole])
  //   @Column({ type: 'json' })
  //   roles!: AuthRole[] | null;
}
