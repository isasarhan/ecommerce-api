import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";

@InputType()
class CartProductInput {
    @Field(() => ID)
    @IsMongoId()
    @IsNotEmpty()
    item: string

    @Field(() => Int, { defaultValue: 1 })
    quantity: number
}

@ArgsType()
export class CreateCartArgs {
    @Field(() => ID)
    @IsMongoId()
    user: string

    @Field(() => [CartProductInput])
    products: CartProductInput[]
}