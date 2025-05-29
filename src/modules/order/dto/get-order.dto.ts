import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@ArgsType()
export class GetOrderArgs {

    @Field(() => ID)
    @IsMongoId()
    id: string
}