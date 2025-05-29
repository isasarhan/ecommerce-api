import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

    @Field()
    @IsBoolean()
    @IsOptional()
    isEnabled: boolean

    @Field(() => Role, { nullable: true })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}