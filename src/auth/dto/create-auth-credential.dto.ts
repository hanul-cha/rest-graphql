import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { GraphQLNonNull } from 'graphql';
import { Column } from 'typeorm';
import { AuthRole } from './auth-role.dto';

@InputType()
export class CreateAuthInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId!: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password!: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @Field({ nullable: true })
  //   @IsString()
  //   @MinLength(10)
  //   @MaxLength(30)
  //   @ValidateIf((object, value) => value !== null)
  address?: string;

  //   @Field(() => [AuthRole])
  //   @Column({ type: 'json' })
  //   roles!: AuthRole[] | null;
}
