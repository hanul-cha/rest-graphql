// import { MigrationInterface, QueryRunner } from 'typeorm'

// export class AddStateToContract1666506497339 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       'ALTER TABLE `contract` ADD COLUMN `state` varchar(30) DEFAULT "APPLY" AFTER `campaign_id`',
//     )
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query('ALTER TABLE `contract` DROP COLUMN `state`')
//   }
// }
