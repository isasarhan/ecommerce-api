import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { CreateUserArgs } from '../user/dto/create-user.dto';
import * as jwt from 'jsonwebtoken'
import { SignInArgs } from './dto/signIn.dto';
import { CartsService } from '../cart/carts.service';
import { WishlistService } from '../wishlist/wishlist.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly service: UsersService,
        private readonly cartService: CartsService,
        private readonly wishlistService: WishlistService,
    ) { }

    async register(userargs: CreateUserArgs) {
        const user = await this.service.create(userargs)

        this.cartService.create({ user: user._id.toString() })
        this.wishlistService.create({ user: user._id.toString() })

        return user
    }

    async signIn(dto: SignInArgs) {
        const { email, password } = dto
        const user = await this.service.findByEmail(email)
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const [cart, wishlist] = await Promise.all([
            this.cartService.findByUserId(user._id.toString()),
            this.wishlistService.findByUserId(user._id.toString())
        ])

        const isPasswordValid = user.matchPassword(password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = this.generateJwtToken(user._id.toString())

        return {
            token,

            user, cart, wishlist

        }
    }

    private generateJwtToken(userId: string): string {
        const payload = { userId }
        return jwt.sign(payload, process.env.JWT_SECRET || 'mysecretjwtkey2648', { expiresIn: '1d' })
    }

    async remove(id: string) {
        const user = await this.service.findById(id)
        if (!user)
            throw new NotFoundException("User not found!")

        const [cart, wishlist] = await Promise.all([
            this.cartService.findByUserId(user._id.toString()),
            this.wishlistService.findByUserId(user._id.toString())
        ])

        this.service.remove(user._id.toString())
        this.cartService.remove(cart._id.toString())
        this.wishlistService.remove(wishlist._id.toString())

        return user
    }
}
