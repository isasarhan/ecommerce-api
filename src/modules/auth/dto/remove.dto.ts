import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@ArgsType()
export class RemoveAccountArgs {

    @Field(() => ID)
    @IsMongoId()
    user: string
}