import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType } from './product.model';
import { CreateProductArgs } from './dto/create-product.dto';
import { UpdateProductArgs } from './dto/update-product.dto';
import { GetProductArgs } from './dto/get-product.dto';

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly service: ProductsService
    ) { }

    @Query(() => ProductType)
    async getProductById(@Args() { id }: GetProductArgs) {
        return this.service.findById(id)
    }

    @Query(() => [ProductType])
    async getProducts() {
        return this.service.findAll()
    }

    @Mutation(() => ProductType)
    async createProduct(@Args() args: CreateProductArgs) {
        return this.service.create(args)
    }

    @Mutation(() => ProductType)
    async updateProduct(@Args() args: UpdateProductArgs) {
        return this.service.update(args)
    }

    @Mutation(() => ProductType)
    async removeProduct(@Args() { id }: GetProductArgs) {
        return this.service.remove(id)
    }
}
