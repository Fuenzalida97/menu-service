import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
// Este es un "decorator" personalizado. Nos permitirá decorar nuestras rutas
// en el controlador, por ejemplo: @Roles(Role.Admin)
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
