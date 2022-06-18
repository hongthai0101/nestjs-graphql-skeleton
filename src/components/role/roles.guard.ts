import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
    
    if (!roles.length) {
      return true;
    }
    const { user } = ctx.getContext().req;
    return roles.includes(+user?.role);
  }
}
