import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from '../user/user.model';
import { CreateUserArgs } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInArgs } from './dto/signIn.dto';
import { AuthType } from './auth.model';
import { RemoveAccountArgs } from './dto/remove.dto';
import { UsersService } from '../user/users.service';
import { CartsService } from '../cart/carts.service';
import { WishlistService } from '../wishlist/wishlist.service';

@Resolver(() => AuthType)
export class AuthResolver {
    constructor(
        private readonly service: AuthService,
        private readonly userService: UsersService,
        private readonly cartService: CartsService,
        private readonly wishlistService: WishlistService,
    ) { }

    @ResolveField()
    async user(@Parent() auth: AuthType) {
        const { user } = auth
        return this.userService.findById(user._id.toString())
    }

    @ResolveField()
    async cart(@Parent() auth: AuthType) {
        const { user } = auth
        return this.cartService.findByUserId(user._id.toString())
    }

    @ResolveField()
    async wishlist(@Parent() auth: AuthType) {
        const { wishlist } = auth
        return this.wishlistService.findByUserId(wishlist._id.toString())
    }

    @Mutation(() => UserType)
    async register(@Args() args: CreateUserArgs) {
        return this.service.register(args)
    }

    @Mutation(() => AuthType)
    async signIn(@Args() args: SignInArgs) {
        return this.service.signIn(args)
    }

    @Mutation(() => UserType)
    async removeAccount(@Args() { user }: RemoveAccountArgs) {
        return this.service.remove(user)
    }

}
