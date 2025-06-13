import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductArgs } from './dto/create-product.dto';
import { UpdateProductArgs } from './dto/update-product.dto';
import { GetProductsArgs } from './dto/get-all..dto';
import { IFilter } from 'src/common/types/filter';

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

    filter(filter: GetProductsArgs) {
        let categoryIds: Types.ObjectId[] = []
        if (filter.categories)
            categoryIds = filter.categories.map(id => new Types.ObjectId(id));

        return {
            ...filter.categories && filter.categories.length > 0 && { categories: { $in: categoryIds } },
        }
    }
    
    async findAll(filters: IFilter, page: number = 1, limit: number = 20) {
        const finalLimit = filters.pageSize || limit;

        const skip = (page - 1) * finalLimit;

        const [products, total] = await Promise.all([
            this.model.find(filters).limit(finalLimit).skip(skip).exec(),
            this.model.countDocuments(filters),
        ]);

        return {
            data: products,
            total,
            page,
            pages: Math.ceil(total / finalLimit),
        };
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
