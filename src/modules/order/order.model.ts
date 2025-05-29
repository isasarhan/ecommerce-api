import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { ObjectId, Types } from "mongoose"
import { PaymentMethod, Status } from "./order.schema"
import { Currency } from "src/common/types/enums"

@ObjectType()
export class OrderItem {
    @Field()
    product: Types.ObjectId

    @Field()
    quantity: number
}

@ObjectType()
export class OrderType {
    @Field(() => ID)
    _id: ObjectId

    @Field()
    user: Types.ObjectId

    @Field(() => [OrderItem])
    items: OrderItem[]

    @Field()
    shippingAddress: string

    @Field()
    billingAddress: string

    @Field()
    city: string

    @Field()
    country: string

    @Field(() => PaymentMethod)
    paymentMethod: PaymentMethod

    @Field()
    status: Status

    @Field()
    totalAmount: number

    @Field()
    currency: Currency
}

registerEnumType(Currency, {
    name: 'Currency',
    description: 'The currency of the product price',
})

registerEnumType(PaymentMethod, {
    name: 'PaymentMethod',
    description: 'The payment method of the order',
})

registerEnumType(Status, {
    name: 'Status',
    description: 'The status of the order',
})