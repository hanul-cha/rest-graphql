import { Field, InputType } from '@nestjs/graphql'
import {
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator'
import { GraphQLInt, GraphQLString } from 'graphql'
import { CampaignType } from '../campaign.type'

@InputType()
export class AddCampaignInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title!: string

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  contents!: string | null

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  startDate: string | null

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  endDate: string | null

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  openLink: string | null

  @Field(() => GraphQLInt, { nullable: true })
  @IsInt()
  @ValidateIf((_, value) => value !== null)
  maximumUserLength: number | null

  @Field(() => CampaignType)
  @IsEnum(CampaignType)
  type: CampaignType

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  startSpace: string | null

  @Field(() => GraphQLString, { nullable: true })
  @IsString()
  @ValidateIf((_, value) => value !== null)
  endSpace: string | null
}
