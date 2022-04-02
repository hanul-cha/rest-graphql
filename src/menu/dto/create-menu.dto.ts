import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
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
