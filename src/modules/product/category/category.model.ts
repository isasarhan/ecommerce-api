import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class ProductCategoryType {
    @Field(() => ID)
    readonly _id?: ObjectId;

    @Field()
    name: string;

    @Field({nullable:true})
    slug: string;

    @Field({nullable:true})
    img: string;

    @Field({nullable:true})
    description: string;
}