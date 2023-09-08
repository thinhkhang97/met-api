import { LoggedInUser } from '@lib/shared/services';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GraphQLUser = createParamDecorator(
  (data: unknown, context: ExecutionContext & { user: LoggedInUser }) => {
    const _context = GqlExecutionContext.create(context).getContext();
    return _context.user;
  },
);
