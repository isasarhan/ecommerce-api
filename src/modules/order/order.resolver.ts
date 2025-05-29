import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderType } from './order.model';
import { GetOrderArgs } from './dto/get-order.dto';
import { CreateOrderArgs } from './dto/create-order.dto';
import { UpdateOrderArgs } from './dto/update-order.dto';

@Resolver()
export class OrderResolver {
    constructor(
        private readonly service: OrderService
    ) { }

    @Query(() => OrderType)
    async getOrderById(@Args() {id}: GetOrderArgs) {
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
