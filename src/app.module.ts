import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/users.module';
import { ProductsModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/product/category/categories.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { CartModule } from './modules/cart/cart.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

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
      sortSchema: true, // stored Lexicographically
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule
  ],
})
export class AppModule { }
