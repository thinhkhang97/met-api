import { Either, InternalAuthGuard } from '@lib/shared';
import { GetUserQuery } from '@lib/user/application/queries';
import { User } from '@lib/user/domain';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('/user/:id')
  public async getUserById(@Param() params: { id: string }) {
    const result = await this._queryBus.execute<GetUserQuery, Either<User>>(
      new GetUserQuery({ userId: params.id }),
    );

    if (result.isErr()) {
    }
  }
}
