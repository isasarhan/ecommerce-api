import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wishlist } from './wishlist.schema';
import { CreateWishlistArgs } from './dto/create.dto';
import { UpdateWishlistArgs } from './dto/update.dto';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel(Wishlist.name) private model: Model<Wishlist>
    ) { }

    async create(dto: CreateWishlistArgs) {
        const newWishlist = new this.model({
            ...dto,
            user: new Types.ObjectId(dto.user)
        });
        return newWishlist.save();
    }

    async findByUserId(user: string) {
        const WishlistExists = await this.model.findOne({ user: new Types.ObjectId(user) })
        if (!WishlistExists) {
            throw new NotFoundException('Wishlist was not found!');
        }
        return WishlistExists
    }

    async findAll() {
        return await this.model.find()
    }

    async update(dto: UpdateWishlistArgs) {
        const { id, ...wishlist } = dto
        const updated = await this.model.findByIdAndUpdate(id, { $set: wishlist }, { new: true })
        if (!updated) {
            throw new NotFoundException('Wishlist was not found!');
        }
        return updated
    }

    async remove(id: string) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            throw new NotFoundException('Wishlist was not found!');
        }
    }
}
