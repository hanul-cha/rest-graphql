import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './auth/auth.repository';
import { CampaignRepository } from './campaign/campaign.repository';
import { ContractRepository } from './contract/contract.repository';

export const globalDynamicModule = TypeOrmModule.forFeature([
  UserRepository,
  ContractRepository,
  CampaignRepository,
]);
