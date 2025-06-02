import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcryptjs'
export type UserDocument = User & Document

export enum Role {
    CUSTOMER = "customer",
    ADMIN = "admin",
    MANAGER = "manager"
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    userName: string

    @Prop()
    fistName: string

    @Prop()
    lastName: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true, unique: true })
    phone: string

    @Prop()
    password: string

    @Prop({ default: false })
    isEnabled: boolean

    @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
    role: string

    matchPassword: (password: string) => Promise<boolean>
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
