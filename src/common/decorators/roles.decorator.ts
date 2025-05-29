import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/user/user.schema';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
