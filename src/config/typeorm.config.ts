import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lunchbox',
  entities: ['dist/**/*.entity.js'],
  // entities: ['dist/**/*.entity.{ts,js}', 'dist/**/*.repository.{ts,js}'],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrations: ['migrations/**/*{.ts,.js}'],
}

//TODO: dir이 제거되었음 추가해줘서 migration테스트 해봐야함
