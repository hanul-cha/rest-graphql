import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const Authorize = (roles?: string | string[]) => {
  return applyDecorators(SetMetadata('roles', [roles].flat()));
};
