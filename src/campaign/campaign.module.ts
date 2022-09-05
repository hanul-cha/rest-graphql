import { Module } from '@nestjs/common'
import { globalDynamicModule } from 'src/globalDynamicModule'
import { CampaignResolver } from './campaign.resolver'
import { CampaignService } from './campaign.service'

@Module({
  imports: [globalDynamicModule],
  providers: [CampaignService, CampaignResolver],
  exports: [CampaignService],
})
export class CampaignModule {}
