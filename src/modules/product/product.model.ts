import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { ObjectId, Types } from "mongoose"
import { Currency } from "src/common/types/enums"
import { ProductCategoryType } from "./category/category.model"

registerEnumType(Currency, {
    name: 'Currency',
    description: 'The currency of the product price',
})


@ObjectType()
export class ProductType {
    @Field(() => ID)
    _id: ObjectId

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

    @Field(() => Float)
    price: number

    @Field(() => Float, { nullable: true })
    salePrice?: number

    @Field(() => Currency)
    currency: Currency

    @Field(() => Int)
    stock: number

    @Field(() => [ProductCategoryType])
    categories: string[]

    @Field({ nullable: true })
    featuredImage?: string

    @Field(() => [String], { nullable: true })
    images?: string[]

    @Field()
    enabled: boolean

    @Field(() => GraphQLISODateTime)
    createdAt?: Date
}