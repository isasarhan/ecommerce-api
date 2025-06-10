import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../user/users.module';
import { ProductsModule } from '../product/products.module';
import { Wishlist, WishlistSchema } from './wishlist.schema';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';

@Module({
  imports: [
    UsersModule, ProductsModule,
    MongooseModule.forFeature([{
      name: Wishlist.name,
      schema: WishlistSchema
    }]),
  ],
  providers: [
    WishlistService, WishlistResolver
  ],
  exports: [WishlistService]
})
export class WishlistModule {}
