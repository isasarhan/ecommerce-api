import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ProductsModule } from '../product/products.module';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema
    }]),
  ],
  providers: [
    OrderService, OrderResolver
  ],
  exports: [
    OrderService
  ]
})
export class OrderModule { }
