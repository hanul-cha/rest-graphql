import { DataSource, DataSourceOptions } from 'typeorm'

const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lunchbox',
  entities: ['dist/**/*.entity.{ts,js}', 'dist/**/*.repository.{ts,js}'],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrations: ['migrations/**/*{.ts,.js}'],
}

const AppDataSource = new DataSource(options)

export default AppDataSource
