import { Field, InputType } from '@nestjs/graphql'
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class SignInAuthInput {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userId!: string

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password!: string
}
