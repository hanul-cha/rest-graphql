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
import { GqlAuthGuard } from './auth/auth.guard';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      // context: ({ req, connection }) => {
      //   if (req) {
      //     const user = req.headers.authorization;
      //     return { ...req, user };
      //   } else {
      //     return connection;
      //   }
      // },
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    MenuModule,
    AuthModule,
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
