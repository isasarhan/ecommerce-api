import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CreateProductArgs } from "./create-product.dto";

@ArgsType()
export class UpdateProductArgs extends PartialType(CreateProductArgs) {
    @Field(() => ID)
    id: ObjectId
}