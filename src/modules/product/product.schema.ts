import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Currency } from 'src/common/types/enums'

export type ProductDocument = Product & Document

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true })
  price: number

  @Prop()
  salePrice: number

  @Prop({ type: String, enum: Currency, default: Currency.Usd })
  currency: Currency

  @Prop({ default: 0 })
  stock: number

  @Prop({ type: [Types.ObjectId], ref: 'ProductCategory' })
  categories: Types.ObjectId[]

  @Prop(String)
  featuredImage: string

  @Prop([String])
  images: string[]

  @Prop({ default: true })
  enabled: boolean

  @Prop({ default: () => Date.now() })
  createdAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
