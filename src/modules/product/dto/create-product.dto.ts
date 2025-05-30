import { ArgsType, Field, Float, ID, Int } from "@nestjs/graphql";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { Currency } from "src/common/types/enums";

@ArgsType()
export class CreateProductArgs {
    @Field()
    @IsString()
    name: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    description?: string

    @Field(() => Float)
    @IsNotEmpty()
    price: number

    @Field(() => Float)
    @IsOptional()
    salePrice: number

    @Field(() => Currency, { nullable: true })
    @IsOptional()
    @IsEnum(Currency)
    currency: Currency

    @Field(() => Int, { nullable: true })
    @IsOptional()
    stock?: number

    @Field(() => [ID], { nullable: true })
    @IsOptional()
    @IsMongoId()
    @ValidateNested({ each: true })
    categories?: Types.ObjectId[]

    @Field({ nullable: true })
    @IsOptional()
    featuredImage?: string

    @Field(() => [String], { nullable: true })
    @IsOptional()
    images?: string[]

    @Field({ nullable: true })
    @IsOptional()
    enabled?: boolean
}