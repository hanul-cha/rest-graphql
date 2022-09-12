import { TypeOrmModuleOptions } from '@nestjs/typeorm'

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

//TODO: dir이 제거되었음 추가해줘서 migration테스트 해봐야함
