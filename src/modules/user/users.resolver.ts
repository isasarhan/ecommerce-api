import { Query, Resolver } from "@nestjs/graphql";
import { UserType } from "./user.model";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
    constructor(
        private readonly service: UsersService
    ) { }

    @Query(() => String)
    async hello(): Promise<string> {
        return 'Say Hello'
    }

    @Query(() => [UserType])
    async getAll() {
        return this.service.findAll()
    }
}
