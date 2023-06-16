import { DataSource, DataSourceOptions } from 'typeorm'

const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USERNAME_ORM,
  password: process.env.USERNAME_ORM,
  database: 'lunchbox',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrations: ['migrations/**/*{.ts,.js}'],
}

const AppDataSource = new DataSource(options)

export default AppDataSource
