import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { CampaignType, GraphQLCampaignType } from '../campaign.type';

@InputType()
export class AddCampaignInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title!: string;

  @Field({ nullable: true })
  @IsString()
  contents: string | null;

  @Field({ nullable: true })
  @IsString()
  startDate: string | null;

  @Field({ nullable: true })
  @IsString()
  endDate: string | null;

  @Field({ nullable: true })
  @IsString()
  openLink: string | null;

  @Field({ nullable: true })
  @IsInt()
  maximumUserLength: number | null;

  @Field(() => GraphQLCampaignType)
  @IsString()
  type: CampaignType;

  @Field({ nullable: true })
  @IsString()
  startSpace: string | null;

  @Field({ nullable: true })
  @IsString()
  endSpace: string | null;
}
