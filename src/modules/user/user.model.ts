import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class UserType {
    @Field(() => ID)
    @IsString()
    readonly _id?: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field()
    role: string;
}