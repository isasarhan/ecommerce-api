import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoriesService } from './categories.service';
import { ProductCategoryType } from './category.model';
import { CreateProductCategoryArgs } from './dto/create-product-category.dto';
import { UpdateProductCategoryArgs } from './dto/update-product-category.dto';
import { GetProductCategoryArgs } from './dto/get-product-category.dto';

@Resolver()
export class CategoriesController {
    constructor(
        private readonly service: ProductCategoriesService
    ) { }

    @Query(() => ProductCategoryType)
    async getProductCategoryById(@Args('id', { type: () => ID }) id: string) {
        return this.service.findById(id)
    }

    @Query(() => [ProductCategoryType])
    async getAllProductCategorys() {
        return this.service.findAll()
    }

    @Mutation(() => ProductCategoryType)
    async createProductCategory(@Args() args: CreateProductCategoryArgs) {
        return this.service.create(args)
    }

    @Mutation(() => ProductCategoryType)
    async updateProductCategory(@Args() args: UpdateProductCategoryArgs) {
        return this.service.update(args)
    }

    @Mutation(() => ProductCategoryType)
    async removeProductCategory(@Args() { id }: GetProductCategoryArgs) {
        return this.service.remove(id)
    }
}
