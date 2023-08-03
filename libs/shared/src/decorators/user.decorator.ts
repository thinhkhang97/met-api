import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const LogginedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let request;
    if (context.getType<GqlContextType>() === 'graphql') {
      request = GqlExecutionContext.create(context).getContext().req;
    } else {
      request = context.switchToHttp().getRequest().req;
    }
    console.log(request.user);
    return request.user;
  },
);
