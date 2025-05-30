import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Role } from "./user.schema"
import { ObjectId } from "mongoose"

registerEnumType(Role, {
    name: 'Role',
    description: 'The role of the user',
})

@ObjectType()
export class UserType {
    @Field(() => ID)
    _id: ObjectId

    @Field()
    userName: string

    @Field({ nullable: true })
    firstName?: string

    @Field({ nullable: true })
    lastName?: string

    @Field()
    email: string

    @Field()
    phone: string

    @Field()
    isEnabled: boolean

    @Field(() => Role)
    role: Role
}