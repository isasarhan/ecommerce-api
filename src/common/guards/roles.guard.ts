import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/modules/user/user.model';
import { Role } from 'src/modules/user/user.schema';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: UserType = request.user;
        if (user.role === Role.ADMIN) return true
        return requiredRoles.includes(user.role)
    }
}
