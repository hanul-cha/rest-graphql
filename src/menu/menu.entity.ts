import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLNonNull } from 'graphql';

@ObjectType()
export class Menu {
  @Field((type) => Int)
  id: number;

  title: string;

  contents: string;

  img: string;

  price: number;

  @Field()
  menuType: string;

  createAt: number;
  updateAt: number;
}
