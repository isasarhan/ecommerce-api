import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { Pagination } from "src/common/types/filter";
import { UserType } from "../user.model";

@ArgsType()
export class GetUsersArgs extends Pagination {
    @IsOptional()
    @IsString()
    searchTerm?: string 
}

@ObjectType()
export class GetUsersResponse {
    @Field(() => [UserType])
    data: UserType[]

    @Field(() => Int)
    total: number

    @Field(() => Int)
    page: number
    
    @Field(() => Int)
    pages: number
}