import { applyDecorators, SetMetadata } from '@nestjs/common';
import { AuthRole } from 'src/auth/dto/auth-role.dto';

export const Authorize = (roles: AuthRole | AuthRole[] | null) => {
  let initialRoles: AuthRole[] | null = null;

  if (roles) {
    initialRoles = !Array.isArray(roles) ? [roles] : roles;
  }

  return applyDecorators(SetMetadata('roles', initialRoles));
};
