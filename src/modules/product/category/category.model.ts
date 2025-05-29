import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class ProductCategoryType {
    @Field(() => ID)
    readonly _id?: ObjectId;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    img: string;

    @Field()
    description: string;
}