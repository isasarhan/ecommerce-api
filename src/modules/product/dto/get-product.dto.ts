import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@ArgsType()
export class GetProductArgs {

    @Field(() => ID)
    @IsMongoId()
    id: string
}