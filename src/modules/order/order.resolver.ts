import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderType } from './order.model';
import { GetOrderArgs } from './dto/get-order.dto';
import { CreateOrderArgs } from './dto/create-order.dto';
import { UpdateOrderArgs } from './dto/update-order.dto';
import { ProductsService } from '../product/products.service';

@Resolver(() => OrderType)
export class OrderResolver {
    constructor(
        private readonly service: OrderService,
        private readonly productsService: ProductsService
    ) { }

    @ResolveField()
    async products(@Parent() order: OrderType) {
        const { products } = order
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

    @Query(() => OrderType)
    async getOrderById(@Args() { id }: GetOrderArgs) {
        return this.service.findById(id)
    }

    @Query(() => [OrderType])
    async getOrders() {
        return this.service.findAll()
    }

    @Mutation(() => OrderType)
    async createOrder(@Args() args: CreateOrderArgs) {
        return this.service.create(args)
    }

    @Mutation(() => OrderType)
    async updateOrder(@Args() args: UpdateOrderArgs) {
        return this.service.update(args)
    }

    @Mutation(() => OrderType)
    async removeOrder(@Args() { id }: GetOrderArgs) {
        return this.service.remove(id)
    }
}
