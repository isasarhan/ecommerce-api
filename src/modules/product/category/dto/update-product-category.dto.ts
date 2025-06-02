import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";
import { CreateProductCategoryArgs } from "./create-product-category.dto"
import { ObjectId } from "mongoose";

@ArgsType()
export class UpdateProductCategoryArgs extends PartialType(CreateProductCategoryArgs) {
    @Field(() => ID)
    id: ObjectId
}