import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

@Schema()
export class Wishlist {
    @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
    user: ObjectId

    @Prop({ type: [Types.ObjectId], ref: 'Product', default:[] })
    products: ObjectId[]
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist)