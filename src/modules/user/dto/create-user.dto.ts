import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ArgsType()
export class CreateUserArgs {

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

    @Field({ nullable: true })
    @IsOptional()
    role?: string;
}