import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const User = createParamDecorator(
  (data: string, context: ExecutionContext): Record<string, any> => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return data ? user[data] : user;
  },
);
