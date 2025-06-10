import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Pagination } from "src/common/types/filter";
import { ProductType } from "../product.model";

@ArgsType()
export class GetProductsArgs extends Pagination {
    @Field(() => [String], { nullable: true })
    categories?: string[]
}

@ObjectType()
export class GetProductsResponse {
    @Field(() => [ProductType])
    data: ProductType[]

    @Field(() => Int)
    total: number

    @Field(() => Int)
    page: number
    
    @Field(() => Int)
    pages: number
}