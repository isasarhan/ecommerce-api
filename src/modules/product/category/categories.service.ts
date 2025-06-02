import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductCategory } from './category.schema';
import { Model } from 'mongoose';
import { CreateProductCategoryArgs } from './dto/create-product-category.dto';
import { UpdateProductCategoryArgs } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectModel(ProductCategory.name) private model: Model<ProductCategory>
    ) { }

    async create(dto: CreateProductCategoryArgs) {
        const newCategory = new this.model(dto);
        return newCategory.save();
    }

    async findById(id: string) {
        const categoryExists = await this.model.findById(id)
        if (!categoryExists) {
            throw new NotFoundException('Category was not found!');
        }
        return categoryExists
    }

    async findAll() {
        return await this.model.find()
    }

    async update(dto: UpdateProductCategoryArgs) {
        console.log('dto' ,dto);
        
        const { id, ...category } = dto
        const updated = await this.model.findByIdAndUpdate(id, { $set: category }, { new: true })
        if (!updated) {
            throw new NotFoundException('Category was not found!');
        }
        return updated
    }

    async remove(id: string) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            throw new NotFoundException('Category was not found!');
        }
    }
}
