import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { ObjectId, Types } from "mongoose";

@Schema({ _id: false })
class Product {
    @Prop({ type: Types.ObjectId, ref: "Product" })
    item: ObjectId

    @Prop()
    quantity: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema()
export class Cart {
    @Prop({ type: Types.ObjectId, ref: "User", unique: true })
    user: string

    @Prop({ type: [ProductSchema] })
    @Type(() => Product)
    products: Product[]
}

export const CartSchema = SchemaFactory.createForClass(Cart);