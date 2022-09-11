import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver } from '@nestjs/apollo'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MenuModule } from './menu/menu.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './config/typeorm.config'
import { AuthModule } from './user/user.module'
import { GqlAuthGuard } from './guard/auth.guard'
import { PassportModule } from '@nestjs/passport'
import { ContractModule } from './contract/contract.module'
import { CampaignModule } from './campaign/campaign.module'
import { globalDynamicModule } from './globalDynamicModule'

@Module({
  imports: [
    PassportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            return connectionParams
          },
        },
      },
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    globalDynamicModule,
    MenuModule,
    AuthModule,
    ContractModule,
    CampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
