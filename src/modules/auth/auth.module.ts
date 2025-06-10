import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../user/users.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { CartsModule } from '../cart/carts.module';

@Module({
    imports: [UsersModule, WishlistModule, CartsModule],
    providers: [
        AuthService, AuthResolver
    ],
})
export class AuthModule { }
