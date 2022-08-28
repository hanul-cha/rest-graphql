import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CampaignType, GraphQLCampaignType } from './campaign.type';

@Entity()
@ObjectType()
export class Campaign extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  @Column({ type: Number, name: 'create_user_id' })
  createUserId: string;

  @Field(() => String)
  @Column({ type: String })
  title: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: String,
    nullable: true,
    default: null,
  })
  contents: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'start_date',
    nullable: true,
    default: null,
  })
  startDate: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'end_date',
    nullable: true,
    default: null,
  })
  endDate: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'timestamp',
    name: 'dead_line',
    nullable: true,
    default: null,
  })
  deadLine: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    type: String,
    name: 'open_link',
    nullable: true,
    default: null,
  })
  openLink: string | null;

  @Field(() => Number, { nullable: true })
  @Column({
    type: Number,
    name: 'maximum_user_length',
    nullable: true,
    default: null,
  })
  maximumUserLength: number | null;

  @Field(() => CampaignType)
  @Column({
    enum: CampaignType,
  })
  type: CampaignType;

  @Field(() => String, { nullable: true })
  @Column({
    type: String,
    name: 'start_space',
    nullable: true,
    default: null,
  })
  startSpace: string | null;

  @Field(() => String, { nullable: true })
  @Column({
    type: String,
    name: 'end_space',
    nullable: true,
    default: null,
  })
  endSpace: string | null;

  @Field(() => Number)
  @Column({
    type: Number,
    name: 'count_like',
    default: 0,
  })
  countLike: number;

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
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: number;
}
