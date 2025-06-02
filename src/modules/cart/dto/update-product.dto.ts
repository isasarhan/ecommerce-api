import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CreateCartArgs } from "./create-cart.dto";

@ArgsType()
export class UpdateCartArgs extends PartialType(CreateCartArgs) {
    @Field(() => ID)
    id: ObjectId
}