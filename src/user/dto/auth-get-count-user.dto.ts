import { Field, InputType } from '@nestjs/graphql'
import { ArrayUnique, ValidateIf } from 'class-validator'
import { ContractState } from 'src/contract/contract.type'

@InputType()
export class AuthInputGetCountUser {
  @Field(() => [ContractState!])
  @ArrayUnique()
  @ValidateIf((object, value) => value !== null)
  states?: ContractState[] | null
}
