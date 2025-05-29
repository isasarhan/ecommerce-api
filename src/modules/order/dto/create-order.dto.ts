import { ArgsType, Field, ID, InputType } from "@nestjs/graphql"
import { ObjectId, Types } from "mongoose"
import { Currency } from "src/common/types/enums"
import { PaymentMethod, Status } from "../order.schema"
import { IsEnum, IsOptional } from "class-validator"

@InputType()
export class OrderItemInput {
    @Field(() => ID)
    item: string

    @Field()
    quantity: number
}

@ArgsType()
export class CreateOrderArgs {
    @Field(() => ID)
    user: Types.ObjectId

    @Field(() => [OrderItemInput])
    products: OrderItemInput[]

    @Field({ nullable: true })
    @IsOptional()
    shippingAddress: string

    @Field({ nullable: true })
    @IsOptional()
    billingAddress: string

    @Field()
    city: string

    @Field()
    country: string

    @Field(() => PaymentMethod, { nullable: true })
    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod

    @Field(() => Status, { nullable: true })
    @IsOptional()
    @IsEnum(Status)
    status: Status

    @Field()
    @IsOptional()
    totalAmount: number

    @Field(() => Currency, { nullable: true })
    @IsOptional()
    @IsEnum(Currency)
    currency: Currency
}
