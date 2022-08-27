import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { AuthRole } from 'src/auth/dto/auth-role.dto';
import { GqlAuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Authorize } from './roles.decorator';

interface QueryOption {
  roles?: AuthRole | AuthRole[];
  return?: ReturnTypeFunc;
  options?: QueryOptions;
}

export const GuardQuery = (option?: QueryOption) => {
  return applyDecorators(
    Authorize(option.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    Query(option.return, option.options),
  );
};
