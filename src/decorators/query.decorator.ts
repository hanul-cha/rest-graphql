import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  Mutation,
  Query,
  QueryOptions,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { AuthRole } from 'src/auth/dto/auth-role.dto';
import { GqlAuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Authorize } from './roles.decorator';

interface QueryOption {
  roles?: AuthRole | AuthRole[];
  return?: ReturnTypeFuncValue;
  options?: QueryOptions;
}

// GqlAuthGuard 가드는 홀로 사용 가능하지만 RolesGuard는 req.user를 넘겨주는 가드와 사용가능합니다.
export const GuardQuery = (option?: QueryOption) => {
  return applyDecorators(
    Authorize(option.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    Query(() => {
      return option.return;
    }, option.options),
  );
};

export const GuardMutation = (option?: QueryOption) => {
  return applyDecorators(
    Authorize(option.roles ?? null),
    UseGuards(GqlAuthGuard, RolesGuard),
    Mutation(() => {
      return option.return;
    }, option.options),
  );
};
