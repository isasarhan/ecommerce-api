import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.schema';
import { Model, Types } from 'mongoose';
import { CreateCartArgs } from './dto/create-cart.dto';
import { UpdateCartArgs } from './dto/update-product.dto';

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private model: Model<Cart>
    ) { }

    async create(dto: CreateCartArgs) {
        const newcart = new this.model({
            ...dto,
            user: new Types.ObjectId(dto.user)
        });
        return newcart.save();
    }

    async findByUserId(user: string) {
        const cartExists = await this.model.findOne({ user: new Types.ObjectId(user) })
        if (!cartExists) {
            throw new NotFoundException('Cart was not found!');
        }
        return cartExists
    }

    async findAll() {
        return await this.model.find()
    }

    async update(dto: UpdateCartArgs) {
        const { id, ...Cart } = dto
        const updated = await this.model.findByIdAndUpdate(id, { $set: Cart }, { new: true })
        if (!updated) {
            throw new NotFoundException('Cart was not found!');
        }
        return updated
    }

    async remove(id: string) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            throw new NotFoundException('Cart was not found!');
        }
    }
}
