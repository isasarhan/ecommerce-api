import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Model } from 'mongoose'
import { CreateUserArgs } from './dto/create-user.dto'
import { UpdateUserArgs } from './dto/update-user.dto'
import { IFilter } from 'src/common/types/filter'
import { GetUsersArgs } from './dto/get-all.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private model: Model<User>
    ) { }

    async create(dto: CreateUserArgs) {
        const userExists = await this.model.findOne({ email: dto.email })
        if (userExists) {
            throw new ConflictException('User with this email already exists')
        }
        const newUser = new this.model(dto)
        return newUser.save()
    }

    async findById(id: string) {
        const userExists = await this.model.findById(id)
        if (!userExists) {
            throw new NotFoundException('User was not found!')
        }
        return userExists
    }

    async findByEmail(email: string) {
        return await this.model.findOne({ email })
    }

    filter(filter: GetUsersArgs) {
        return {
            ...(filter.searchTerm && {
                $or: [
                    { email: { $regex: filter.searchTerm, $options: 'i' } },
                    { phone: { $regex: filter.searchTerm, $options: 'i' } },
                    { userName: { $regex: filter.searchTerm, $options: 'i' } },
                    { firstName: { $regex: filter.searchTerm, $options: 'i' } },
                    { lastName: { $regex: filter.searchTerm, $options: 'i' } },
                ],
            }),
        }
    }

    async findAll(filters: IFilter, page: number = 1, limit: number = 20) {
        const finalLimit = filters.pageSize || limit;

        const skip = (page - 1) * finalLimit;

        const [users, total] = await Promise.all([
            this.model.find(filters).limit(finalLimit).skip(skip).exec(),
            this.model.countDocuments(filters),
        ]);

        return {
            data: users,
            total,
            page,
            pages: Math.ceil(total / finalLimit),
        };
    }


    async update(dto: UpdateUserArgs) {
        const { id, ...user } = dto
        const updated = await this.model.findByIdAndUpdate(id, { $set: user }, { new: true })
        if (!updated) {
            throw new NotFoundException('User was not found!')
        }
        return updated
    }


    async remove(id: string) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            throw new NotFoundException('User was not found!')
        }
    }


}
