import { Module } from '@nestjs/common';
import { ProdcutCategoryResolver } from './categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdcutCategorySchema, ProductCategory } from './category.schema';
import { ProductCategoriesService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: ProductCategory.name,
      schema: ProdcutCategorySchema
    }]),
  ],
  providers: [
    ProductCategoriesService, ProdcutCategoryResolver
  ],
  exports: [ProductCategoriesService]
})
export class ProductCategoriesModule {}
