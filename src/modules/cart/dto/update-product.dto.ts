import { ArgsType, Field, ID } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CreateCartArgs } from "./create-cart.dto";

@ArgsType()
export class UpdateCartArgs extends CreateCartArgs {
    @Field(() => ID)
    id: ObjectId
}