import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderArgs } from './dto/create-order.dto';
import { UpdateOrderArgs } from './dto/update-order.dto';

@Injectable()
export class OrderService {
     constructor(
            @InjectModel(Order.name) private model: Model<Order>
        ) { }
    
        async create(dto: CreateOrderArgs) {
            const newOrder = new this.model(dto);
            return newOrder.save();
        }
    
        async findById(id: string) {
            const OrderExists = await this.model.findById(id)
            if (!OrderExists) {
                throw new NotFoundException('Order was not found!');
            }
            return OrderExists
        }
    
        async findMany(ids: [string]) {
            return Promise.all(ids.map((id) => this.model.findById(id)))
        }
    
        async findAll() {
            return await this.model.find()
        }
    
        async update(dto: UpdateOrderArgs) {
            const { id, ...Order } = dto
            const updated = await this.model.findByIdAndUpdate(id, { $set: Order }, { new: true })
            if (!updated) {
                throw new NotFoundException('Order was not found!');
            }
            return updated
        }
    
        async remove(id: string) {
            const deleted = await this.model.findByIdAndDelete(id)
            if (!deleted) {
                throw new NotFoundException('Order was not found!');
            }
        }
}
