import { Field, Float, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { ObjectId, Types } from "mongoose"
import { Currency } from "src/common/types/enums"

registerEnumType(Currency, {
    name: 'Currency',
    description: 'The currency of the product price',
})


@ObjectType()
export class ProductType {
    @Field(() => ID)
    readonly _id?: ObjectId

    @Field()
    name: string

    @Field()
    description: string

    @Field(() => Float)
    price: number

    @Field(() => Currency)
    currency: Currency

    @Field(() => Int)
    stock: number

    @Field(() => [ID])
    categories: Types.ObjectId[]

    @Field()
    featuredImage: string

    @Field(() => [String])
    images: string[]

    @Field()
    enabled: boolean
}