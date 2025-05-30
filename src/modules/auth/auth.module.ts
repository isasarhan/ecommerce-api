import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../user/users.module';

@Module({
    imports: [UsersModule],
    providers: [
        AuthService, AuthResolver
    ],
})
export class AuthModule { }
