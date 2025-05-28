import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
    CUSTOMER = "customer",
    ADMIN = "admin",
    MANAGER = "manager"
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
