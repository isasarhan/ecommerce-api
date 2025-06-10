import { ArgsType, Field, ID } from "@nestjs/graphql"
import { IsMongoId } from "class-validator"
import { WishlistType } from "../wishlist.model"
import { Types } from "mongoose"

@ArgsType()
export class CreateWishlistArgs {
  @Field(() => ID)
  @IsMongoId()
  user: string

  @Field(() => [String], { nullable: true })
  products?: Types.ObjectId[]
}
