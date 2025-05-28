import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type CheckoutDocument = Checkout & Document;


@Schema({ timestamps: true })
export class Item {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    productId: Types.ObjectId;

    @Prop()
    quantity: number;

    @Prop()
    price: number;
}

@Schema({ timestamps: true })
export class Checkout {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId;

    @Prop({ type: [Item] })
    @Type(() => Item)
    items: Item[];

    @Prop()
    shippingAddress: string;

    @Prop()
    billingAddress: string;

    @Prop()
    paymentMethod: string;

    @Prop({ default: 'pending' })
    status: string;

    @Prop()
    totalAmount: number;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
