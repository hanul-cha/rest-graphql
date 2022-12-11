import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver } from '@nestjs/apollo'

import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module'
import { PassportModule } from '@nestjs/passport'
import { ContractModule } from './contract/contract.module'
import { ProjectModule } from './project/project.module'
import { GqlAuthGuard } from './guard/auth.guard'

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
    UserModule,
    ContractModule,
    ProjectModule,
  ],
  providers: [GqlAuthGuard],
})
export class AppModule {}
