import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { UsersModule } from '../user/users.module';
import { ProductsModule } from '../product/products.module';

@Module({
  imports: [
    UsersModule, ProductsModule,
    MongooseModule.forFeature([{
      name: Cart.name,
      schema: CartSchema
    }]),
  ],
  providers: [
    CartsService, CartsResolver
  ]
})
export class CartsModule {}
