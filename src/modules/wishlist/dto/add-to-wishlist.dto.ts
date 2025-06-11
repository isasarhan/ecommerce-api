import { ArgsType, Field, ID } from "@nestjs/graphql"
import { IsMongoId } from "class-validator"
import { Types } from "mongoose"

@ArgsType()
export class AddToWishlistArgs {
  @Field(() => ID)
  @IsMongoId()
  id: string

  @Field(() => String)
  @IsMongoId()
  product: string
}
