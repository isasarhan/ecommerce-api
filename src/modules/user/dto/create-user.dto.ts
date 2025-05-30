import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../user.schema";

@ArgsType()
export class CreateUserArgs {

    @Field()
    @IsString()
    @IsNotEmpty()
    userName: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    firstName?: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    lastName?: string;

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