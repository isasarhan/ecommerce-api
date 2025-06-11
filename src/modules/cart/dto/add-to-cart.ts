import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

@ArgsType()
export class AddToCartArgs {
    @Field(() => ID)
    @IsMongoId()
    @IsNotEmpty()
    id: string


    @Field()
    @IsNotEmpty()
    item: string

    @Field(() => Int, { nullable: true, defaultValue: 1 })
    @IsOptional()
    quantity?: number = 1

}