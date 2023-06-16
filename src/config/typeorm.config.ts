import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USERNAME_ORM,
  password: process.env.USERNAME_ORM,
  database: 'lunchbox',
  entities: ['dist/**/*.entity.js'],
  // entities: ['dist/**/*.entity.{ts,js}', 'dist/**/*.repository.{ts,js}'],
  synchronize: true,
  migrationsTableName: '_migrations',
  migrations: ['migrations/**/*{.ts,.js}'],
}

//TODO: dir이 제거되었음 추가해줘서 migration테스트 해봐야함
