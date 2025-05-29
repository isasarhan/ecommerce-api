import { ArgsType, Field, ID } from "@nestjs/graphql";
import { CreateProductCategoryArgs } from "./create-product-category.dto"
import { ObjectId } from "mongoose";

@ArgsType()
export class UpdateProductCategoryArgs extends CreateProductCategoryArgs {
    @Field(() => ID)
    id: ObjectId
}