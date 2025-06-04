import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CartsService } from './carts.service'
import { CartType } from './cart.model'
import { CreateCartArgs } from './dto/create-cart.dto'
import { UpdateCartArgs } from './dto/update-product.dto'
import { GetCartByIdArgs, GetCartByUserArgs } from './dto/get-cart.dto'
import { UsersService } from '../user/users.service'
import { ProductsService } from '../product/products.service'

@Resolver(() => CartType)
export class CartsResolver {
    constructor(
        private readonly service: CartsService,
        private readonly userService: UsersService,
        private readonly productsService: ProductsService,
    ) { }

    @ResolveField()
    async user(@Parent() cart: CartType) {
        const { user } = cart
        return this.userService.findById(user.toString())
    }

    @ResolveField()
    async products(@Parent() cart: CartType) {
        const { products } = cart
        return Promise.all(
            products.map(async (product) => {
                const foundProduct = await this.productsService.findById(product.item)
                return {
                    item: foundProduct,
                    quantity: product.quantity,
                }
            }),
        )
    }

    @Query(() => CartType)
    async getCartById(@Args() { user }: GetCartByUserArgs) {
        return this.service.findByUserId(user)
    }

    @Query(() => [CartType])
    async getCarts() {
        return this.service.findAll()
    }

    @Mutation(() => CartType)
    async createCart(@Args() args: CreateCartArgs) {                    
        return this.service.create(args)
    }

    @Mutation(() => CartType)
    async updateCart(@Args() args: UpdateCartArgs) {
        return this.service.update(args)
    }

    @Mutation(() => CartType)
    async removeCart(@Args() { id }: GetCartByIdArgs) {
        return this.service.remove(id)
    }
}
