import { Field, ID, ObjectType } from "@nestjs/graphql"
import { UserType } from "../user/user.model"
import { CartType } from "../cart/cart.model"
import { WishlistType } from "../wishlist/wishlist.model"


@ObjectType()
export class AuthType {
    @Field(() => UserType)
    user: UserType

    @Field(() => CartType)
    cart: CartType

    @Field(() => WishlistType)
    wishlist: WishlistType

    @Field(() => String)
    token: string
}