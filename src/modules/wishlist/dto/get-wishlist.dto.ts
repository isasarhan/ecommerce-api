import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsMongoId, IsOptional } from "class-validator";

@ArgsType()
export class GetWishlistByUserArgs {
    @Field(() => ID)
    @IsMongoId()
    user: string
}
@ArgsType()
export class GetWishlistByIdArgs {
    
    @Field(() => ID)
    @IsMongoId()
    @IsOptional()
    id: string

}