import { Module } from '@nestjs/common'
import { campaignProvider } from './campaign.repository'
import { CampaignResolver } from './campaign.resolver'
import { CampaignService } from './campaign.service'

@Module({
  providers: [CampaignService, CampaignResolver, ...campaignProvider],
  exports: [CampaignService],
})
export class CampaignModule {}
