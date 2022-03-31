import { Field } from '@nestjs/graphql';

export class createMenuInput {
  @Field()
  title: string;

  @Field()
  contents: string;

  @Field()
  img: string;

  @Field()
  price: number;

  @Field()
  menuType: string;
}
