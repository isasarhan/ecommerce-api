import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "./user.model";
import { UsersService } from "./users.service";
import { CreateUserArgs } from "./dto/create-user.dto";
import { UpdateUserArgs } from "./dto/update-user.dto";
import { GetUserArgs } from "./dto/get-user.dto";

@Resolver()
export class UsersResolver {
    constructor(
        private readonly service: UsersService
    ) { }

    @Query(() => UserType)
    async getUserById(@Args('id', { type: () => ID }) id: string) {
        return this.service.findById(id)
    }

    @Query(() => [UserType])
    async getUsers() {
        return this.service.findAll()
    }

    @Mutation(() => UserType)
    async createUser(@Args() args: CreateUserArgs) {
        return this.service.create(args)
    }

    @Mutation(() => UserType)
    async updateUser(@Args() args: UpdateUserArgs) {
        return this.service.update(args)
    }

    @Mutation(() => UserType)
    async removeUser(@Args() { id }: GetUserArgs) {
        return this.service.remove(id)
    }
}
