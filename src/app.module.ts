import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { AuthResolver } from './modules/auth/auth.resolver';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';

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
    AuthModule, UsersModule, ProductsModule, ProductCategoriesModule, CartsModule, OrderModule, AuthModule
  ],
  providers: [AuthResolver, AuthService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.ALL },
        { path: 'auth/(.*)', method: RequestMethod.ALL }
      )
      // .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
