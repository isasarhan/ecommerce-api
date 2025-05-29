import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsMongoId, IsOptional } from "class-validator";

@ArgsType()
export class GetCartByUserArgs {
    @Field(() => ID)
    @IsMongoId()
    user: string
}
@ArgsType()
export class GetCartByIdArgs {
    
    @Field(() => ID)
    @IsMongoId()
    @IsOptional()
    id: string

}