import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { ProductCategoriesModule } from './modules/product/category/categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ProductsModule } from './modules/product/products.module';
import { CartsModule } from './modules/cart/carts.module';
import { OrderResolver } from './modules/order/order.resolver';
import { OrderService } from './modules/order/order.service';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      load: [configuration],
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_HOST}`),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule, ProductsModule, ProductCategoriesModule, CartsModule, OrderModule
  ],
})
export class AppModule { }
