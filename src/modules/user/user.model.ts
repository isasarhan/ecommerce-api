import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Role } from "./user.schema"
import { ObjectId } from "mongoose"

registerEnumType(Role, {
    name: 'Role',
    description: 'The role of the user',
})

@ObjectType()
export class UserType {
    @Field(() => ID)
    readonly _id?: ObjectId

    @Field()
    @IsNotEmpty()
    name: string

    @Field()
    email: string

    @Field()
    isEnabled: boolean

    @Field(() => Role)
    role: Role
}