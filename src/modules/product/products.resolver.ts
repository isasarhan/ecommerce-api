import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType } from './product.model';
import { CreateProductArgs } from './dto/create-product.dto';
import { UpdateProductArgs } from './dto/update-product.dto';
import { GetProductArgs } from './dto/get-product.dto';
import { ProductCategoriesService } from './category/categories.service';
import { GetProductsArgs, GetProductsResponse } from './dto/get-all..dto';

@Resolver(()=>ProductType)
export class ProductsResolver {
    constructor(
        private readonly service: ProductsService,
        private readonly productCategoryservice: ProductCategoriesService,
    ) { }


    @ResolveField()
    async categories(@Parent() product: ProductType) {
        const { categories } = product
        return await Promise.all(
            categories.map(async (category) => {
                return this.productCategoryservice.findById(category)
            }),
        )
    }

    @Query(() => ProductType)
    async getProductById(@Args() { id }: GetProductArgs) {
        return this.service.findById(id)
    }

    @Query(() => GetProductsResponse)
    async getProducts(@Args() args:GetProductsArgs) {        
        const filter = this.service.filter(args)
        return this.service.findAll(filter, args.page, args.pageSize)
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
