import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { UsersService } from '../user/users.service'
import { ProductsService } from '../product/products.service'
import { WishlistType } from './wishlist.model'
import { GetWishlistByIdArgs, GetWishlistByUserArgs } from './dto/get-wishlist.dto'
import { WishlistService } from './wishlist.service'
import { CreateWishlistArgs } from './dto/create.dto'
import { UpdateWishlistArgs } from './dto/update.dto'

@Resolver(() => WishlistType)
export class WishlistResolver {
    constructor(
        private readonly service: WishlistService,
        private readonly userService: UsersService,
        private readonly productsService: ProductsService,
    ) { }

    @ResolveField()
    async user(@Parent() Wishlist: WishlistType) {
        const { user } = Wishlist
        return this.userService.findById(user.toString())
    }

    @ResolveField()
    async products(@Parent() Wishlist: WishlistType) {
        const { products } = Wishlist
        return Promise.all(
            products.map(async (product) => {
                const foundProduct = await this.productsService.findById(product.toString())

            }),
        )
    }

    @Query(() => WishlistType)
    async getWishlistById(@Args() { user }: GetWishlistByUserArgs) {
        return this.service.findByUserId(user)
    }

    @Query(() => [WishlistType])
    async getWishlists() {
        return this.service.findAll()
    }

    @Mutation(() => WishlistType)
    async createWishlist(@Args() args: CreateWishlistArgs) {                    
        return this.service.create(args)
    }

    @Mutation(() => WishlistType)
    async updateWishlist(@Args() args: UpdateWishlistArgs) {
        return this.service.update(args)
    }

    @Mutation(() => WishlistType)
    async removeWishlist(@Args() { id }: GetWishlistByIdArgs) {
        return this.service.remove(id)
    }
}

