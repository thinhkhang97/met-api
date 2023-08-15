import { LoggedUser } from '@lib/shared/services';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GraphQLUser = createParamDecorator(
  (data: unknown, context: ExecutionContext & { user: LoggedUser }) => {
    const _context = GqlExecutionContext.create(context).getContext();
    return _context.user;
  },
);
