// import { MigrationInterface, QueryRunner } from 'typeorm'

// export class ChangeNameCampaignIdToProjectId1670731852604
//   implements MigrationInterface
// {
//   public async up(runner: QueryRunner): Promise<void> {
//     await runner.query('ALTER TABLE `campaign` RENAME `project`')
//     await runner.query(
//       'ALTER TABLE `contract` RENAME COLUMN `campaign_id` TO `project_id`',
//     )
//   }

//   public async down(runner: QueryRunner): Promise<void> {
//     await runner.query('ALTER TABLE `project` RENAME `campaign`')
//     await runner.query(
//       'ALTER TABLE `contract` RENAME COLUMN `project_id` TO `campaign_id`',
//     )
//   }
// }
