import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@ArgsType()
export class CreateProductCategoryArgs {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsOptional()
    slug?: string;

    @Field()
    @IsOptional()
    img?: string;

    @Field()
    @IsOptional()
    description?: string;
}