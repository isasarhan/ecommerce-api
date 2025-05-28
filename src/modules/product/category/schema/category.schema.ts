import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = ProductCategory & Document;

@Schema({ timestamps: true })
export class ProductCategory {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const ProdcutCategorySchema = SchemaFactory.createForClass(ProductCategory);
