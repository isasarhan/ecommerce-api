import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { CreateUserArgs } from '../user/dto/create-user.dto';
import * as jwt from 'jsonwebtoken'
import { SignInArgs } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly service: UsersService
    ) { }

    async register(userargs: CreateUserArgs) {
        console.log('register');
        
        return await this.service.create(userargs)
    }

    async signIn(dto: SignInArgs) {
        const { email, password } = dto
        const user = await this.service.findByEmail(email)
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isPasswordValid = user.matchPassword(password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = this.generateJwtToken(user._id.toString())

        return { token, user }
    }

    private generateJwtToken(userId: string): string {
        const payload = { userId }
        return jwt.sign(payload, process.env.JWT_SECRET || 'mysecretjwtkey2648', { expiresIn: '1d' })
    }
}
