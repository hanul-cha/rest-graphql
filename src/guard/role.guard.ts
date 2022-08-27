import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthRole } from 'src/auth/dto/auth-role.dto';

const matchRoles = (roles: AuthRole[], userRoles: AuthRole[]) => {
  return roles.some((role) => userRoles.some((userRole) => role === userRole));
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AuthRole[] | null>(
      'roles',
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!roles || roles.length === 0) {
      return true;
    }

    return matchRoles(roles, user.roles);
  }
}
