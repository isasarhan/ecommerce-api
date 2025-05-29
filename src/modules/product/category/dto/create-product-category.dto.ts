import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@ArgsType()
export class CreateProductCategoryArgs {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    slug?: string;

    @Field({ nullable: true })
    @IsOptional()
    img?: string;

    @Field({ nullable: true })
    @IsOptional()
    description?: string;
}