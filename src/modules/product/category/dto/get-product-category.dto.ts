import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";

@ObjectType()
export class GetProductCategoryArgs {

    @Field(() => ID)
    @IsMongoId()
    id: string
}