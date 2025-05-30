import { Field, ID, ObjectType } from "@nestjs/graphql"
import { UserType } from "../user/user.model"


@ObjectType()
export class AuthType {
    @Field(() => UserType)
    user: UserType

    @Field(() => String)
    token: string
}