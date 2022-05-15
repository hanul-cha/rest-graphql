import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: String, name: 'ver_id' })
  verId: string;

  @Field(() => String)
  @Column({ type: String })
  name: string;

  @Field(() => String)
  @Column({ type: String, name: 'type_one' })
  typeOne: string;

  @Field(() => String)
  @Column({ type: String, name: 'type_two' })
  typeTwo: string;

  @Field(() => Number)
  @Column({ type: Number })
  total: number;

  @Field(() => Number)
  @Column({ type: Number })
  hp: number;

  @Field(() => Number)
  @Column({ type: Number })
  attack: number;

  @Field(() => Number)
  @Column({ type: Number })
  defense: number;

  @Field(() => Number)
  @Column({ type: Number, name: 'special_attack' })
  spAtk: number;

  @Field(() => Number)
  @Column({ type: Number, name: 'special_defense' })
  spDef: number;

  @Field(() => Number)
  @Column({ type: Number })
  speed: number;

  @Field(() => Boolean)
  @Column({ type: Boolean })
  legendary: boolean;

  @Field(() => Number)
  @Column({ type: Number, default: null })
  image: string;
}
