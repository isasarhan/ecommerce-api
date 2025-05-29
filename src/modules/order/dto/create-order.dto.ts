import { ArgsType, Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Types } from "mongoose"
import { Currency } from "src/common/types/enums"
import { PaymentMethod, Status } from "../order.schema"
import { IsEnum, IsOptional } from "class-validator"

@InputType()
export class OrderItemInput {
    @Field()
    product: Types.ObjectId

    @Field()
    quantity: number
}

@ArgsType()
export class CreateOrderArgs {
    @Field()
    user: Types.ObjectId

    @Field(() => [OrderItemInput])
    items: OrderItemInput[]

    @Field()
    @IsOptional()
    shippingAddress: string

    @Field()
    @IsOptional()
    billingAddress: string

    @Field()
    city: string

    @Field()
    country: string

    @Field(() => PaymentMethod)
    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod

    @Field()
    @IsOptional()
    @IsEnum(Status)
    status: Status

    @Field()
    @IsOptional()
    totalAmount: number

    @Field()
    @IsOptional()
    @IsEnum(Currency)
    currency: Currency
}
