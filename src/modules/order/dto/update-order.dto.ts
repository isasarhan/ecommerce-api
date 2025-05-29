import { ObjectId } from "mongoose";
import { CreateOrderArgs } from "./create-order.dto";
import { Field, ID } from "@nestjs/graphql";

export class UpdateOrderArgs extends CreateOrderArgs{
    @Field(() => ID)
    id: ObjectId
}