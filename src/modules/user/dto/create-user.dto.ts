import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../user.schema";

@ArgsType()
export class CreateUserArgs {

    @Field()
    @IsString()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    isEnabled: boolean

    @Field(() => Role, { nullable: true })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}