import { ObjectId } from "mongoose";
import { CreateOrderArgs } from "./create-order.dto";
import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class UpdateOrderArgs extends CreateOrderArgs{
    @Field(() => ID)
    id: ObjectId
}