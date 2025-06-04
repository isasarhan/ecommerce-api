import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class ProductCategoryType {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => String)
    name: string;

    @Field({ nullable: true })
    slug: string;

    @Field({ nullable: true })
    img: string;

    @Field({ nullable: true })
    description: string;
}