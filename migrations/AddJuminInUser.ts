// import { MigrationInterface, QueryRunner } from 'typeorm'

// export class AddJuminInUser1670727567098 implements MigrationInterface {
//   public async up(runner: QueryRunner): Promise<void> {
//     await runner.query(
//       'ALTER TABLE `user` ADD COLUMN `jumin` varchar(30) DEFAULT NULL AFTER `address`',
//     )
//   }

//   public async down(runner: QueryRunner): Promise<void> {
//     await runner.query('ALTER TABLE `user` DROP COLUMN `jumin`')
//   }
// }
