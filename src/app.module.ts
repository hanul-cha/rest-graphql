import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './guard/auth.guard';
import { PokemonModule } from './pokemon/pokemon.module';
import { PassportModule } from '@nestjs/passport';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    PassportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            return connectionParams;
          },
        },
      },
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    MenuModule,
    AuthModule,
    PokemonModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
