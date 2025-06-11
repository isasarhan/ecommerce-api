import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "../user/user.model";
import { ProductType } from "../product/product.model";
import { Types } from "mongoose";

@ObjectType()
export class WishlistType {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => UserType)
    user: Types.ObjectId

    @Field(() => [ProductType], { nullable: true })
    products: Types.ObjectId[]
}