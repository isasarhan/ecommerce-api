import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { UserType } from "../user/user.model"
import { ProductType } from "../product/product.model"
import { ObjectId, Types } from "mongoose"

@ObjectType()
class CartProduct {
  @Field(() => ProductType)
  item: string;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class CartType {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => UserType)
  user: string;

  @Field(() => [CartProduct])
  products: CartProduct[];
}
