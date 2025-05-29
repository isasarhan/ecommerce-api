import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../user.schema";

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

    @Field(() => Role, { nullable: true })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}