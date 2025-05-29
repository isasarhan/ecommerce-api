import { ArgsType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CreateProductArgs } from "./create-product.dto";

@ArgsType()
export class UpdateProductArgs extends CreateProductArgs {
    @Field(() => ID)
    id: ObjectId
}