import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lunchbox',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
