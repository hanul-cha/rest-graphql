import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

const matchRoles = (roles: string[], userRoles: string[]) => {
  return roles.some((role) => userRoles.some((userRole) => role === userRole));
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);
    // console.log('RolesGuard: ', roles);
    // console.log('gqlContext: ', ctx.getContext().req.user.roles);
    const user = ctx.getContext().req.user;

    return matchRoles(roles, user.roles);
  }
}
