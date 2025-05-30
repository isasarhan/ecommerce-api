import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from '../user/user.model';
import { CreateUserArgs } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInArgs } from './dto/signIn.dto';
import { AuthType } from './auth.model';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly service: AuthService
    ) { }

    @Mutation(() => UserType)
    async register(@Args() args: CreateUserArgs) {
        return this.service.register(args)
    }

    @Mutation(() => AuthType)
    async signIn(@Args() args: SignInArgs) {
        return this.service.signIn(args)
    }

}
