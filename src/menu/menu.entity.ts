import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Menu {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column({ type: String })
  title: string;

  @Column()
  @Field()
  contents: string;

  @Column()
  @Field()
  img: string;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  menuType: string;

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
