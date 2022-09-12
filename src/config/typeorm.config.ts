import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { UserRepository } from 'src/user/user.repository'
import { BaseEntity } from 'typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lunchbox',
  entities: ['dist/**/*.entity.{ts,js}', 'dist/**/*.repository.{ts,js}'],
  // entities: [User, UserRepository, BaseEntity],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
}
