import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class CreateUser {

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