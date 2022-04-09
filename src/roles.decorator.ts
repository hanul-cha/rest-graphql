import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth/auth.guard';
import { RolesGuard } from './role.guard';

export const Authorize = (roles?: string | string[]) =>
  applyDecorators(
    SetMetadata('roles', [roles].flat()),
    UseGuards(GqlAuthGuard, RolesGuard),
  );
