import { ArgsType, Field, ID, PartialType } from "@nestjs/graphql";
import { CreateUserArgs } from "./create-user.dto";
import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

@ArgsType()
export class UpdateUserArgs extends PartialType(CreateUserArgs) {
    @Field(() => ID)
    @IsMongoId()
    id: ObjectId
}