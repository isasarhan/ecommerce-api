import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/modules/user/user.schema';

export interface RequestWithUser extends Request {
    user?: User | null;
}

export interface IToken extends JwtPayload{
    userId: string
}