import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductArgs } from './dto/create-product.dto';
import { UpdateProductArgs } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private model: Model<Product>
    ) { }

    async create(dto: CreateProductArgs) {
        const newproduct = new this.model(dto);
        return newproduct.save();
    }

    async findById(id: string) {
        const productExists = await this.model.findById(id)
        if (!productExists) {
            throw new NotFoundException('Product was not found!');
        }
        return productExists
    }

    async findMany(ids: [string]) {
        return Promise.all(ids.map((id) => this.model.findById(id)))
    }

    async findAll() {
        return await this.model.find()
    }

    async update(dto: UpdateProductArgs) {
        const { id, ...product } = dto
        const updated = await this.model.findByIdAndUpdate(id, { $set: product }, { new: true })
        if (!updated) {
            throw new NotFoundException('Product was not found!');
        }
        return updated
    }

    async remove(id: string) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            throw new NotFoundException('Product was not found!');
        }
    }
}
