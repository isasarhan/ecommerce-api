import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductsResolver } from './products.resolver';
import { ProductCategoriesModule } from './category/categories.module';

@Module({
  imports: [
    ProductCategoriesModule,
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema
    }]),
  ],
  providers: [
    ProductsService, ProductsResolver
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule { }
