import { ObjectId } from "mongoose";
import { CreateOrderArgs } from "./create-order.dto";
import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";

@ArgsType()
export class UpdateOrderArgs extends PartialType(CreateOrderArgs){
    @Field(() => ID)
    id: ObjectId
}