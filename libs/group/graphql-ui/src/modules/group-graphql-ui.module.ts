import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { queries } from '../queries';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [...queries],
})
export class GroupGraphqlUIModule {}
