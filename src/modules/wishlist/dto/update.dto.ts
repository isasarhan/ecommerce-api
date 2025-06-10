import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";
import { CreateWishlistArgs } from "./create.dto";
import { ObjectId } from "mongoose";

@ArgsType()
export class UpdateWishlistArgs extends PartialType(CreateWishlistArgs) {
    @Field(() => ID)
    id: ObjectId
}