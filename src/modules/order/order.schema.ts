import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { Document, Types } from 'mongoose'
import { Currency } from 'src/common/types/enums'

export type OrderDocument = Order & Document

export enum Status {
    PENDING = 'pending',
    PROCESSING = 'processing',
    ON_HOLD = 'on_hold',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    FAILED = 'failed',
    REJECTED = 'rejected',
    APPROVED = 'approved',
}

export enum PaymentMethod {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BANK_TRANSFER = 'bank_transfer',
    PAYPAL = 'paypal',
    APPLE_PAY = 'apple_pay',
    GOOGLE_PAY = 'google_pay',
    STRIPE = 'stripe',
    COD = 'cash_on_delivery',
    OTHER = 'other',
}

@Schema({ _id: false })
export class Item {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    item: Types.ObjectId

    @Prop()
    quantity: number
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId

    @Prop({ type: [Item] })
    @Type(() => Item)
    products: Item[]

    @Prop()
    shippingAddress: string

    @Prop()
    billingAddress: string

    @Prop()
    city: string

    @Prop()
    country: string

    @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.CASH })
    paymentMethod: PaymentMethod

    @Prop({ type: String, enum: Status, default: Status.PENDING })
    status: Status

    @Prop()
    totalAmount: number

    @Prop({ type: String, enum: Currency, default: Currency.Usd })
    currency: Currency
}

export const OrderSchema = SchemaFactory.createForClass(Order)
