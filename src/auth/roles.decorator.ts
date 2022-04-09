import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './auth.guard';
import { RolesGuard } from './role.guard';

export const Authorize = (roles?: string | string[]) => {
  console.log(roles);
  return applyDecorators(SetMetadata('roles', [roles].flat()));
};
