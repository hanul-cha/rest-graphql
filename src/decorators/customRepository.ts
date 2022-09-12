// import { SetMetadata } from '@nestjs/common'
// import { DataSource } from 'typeorm'

// const TYPEORM_CUSTOM_REPOSITORY = 'TYPEORM_CUSTOM_REPOSITORY'

// export function CustomRepository(entity: () => any): ClassDecorator {
//   return SetMetadata(TYPEORM_CUSTOM_REPOSITORY, entity)
// }

// export class CustomTypeOrmModule {}

// export const myDataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'lunchbox',
//   entities: ['dist/**/*.entity.{ts,js}', 'dist/**/*.repository.{ts,js}'],
//   // entities: [User, UserRepository, BaseEntity],
//   synchronize: false,
//   migrationsTableName: '_migrations',
//   migrations: ['dist/migrations/**/*{.ts,.js}'],
//   // cli: {
//   //   migrationsDir: 'src/migrations',
//   // },
// })

// export const UserRepository = myDataSource.getRepository(UserEntity).extend({
//   findUsersWithPhotos() {
//     return this.find({
//       relations: {
//         photos: true,
//       },
//     })
//   },
// })
