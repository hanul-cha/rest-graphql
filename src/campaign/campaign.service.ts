import { Inject, Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { scopeAndWhereSameText } from 'src/scope/scopeAndWhereSameText'
import { SourceToken } from 'src/utils/sourceToken'
import { Campaign } from './campaign.entity'
import { CampaignRepository } from './campaign.repository'
import { AddCampaignInput } from './dto/add-campaign.dto'

@Injectable()
export class CampaignService {
  constructor(
    @Inject(SourceToken.Campaign)
    private campaignRepository: CampaignRepository,
  ) {}

  async addCampaign(
    input: AddCampaignInput & {
      userId: number
    },
  ): Promise<Campaign> {
    const repoCampaign = this.campaignRepository
    const countSameTitleCampaign = await repoCampaign
      .createQueryBuilder()
      .where(scopeAndWhereSameText(input.title, 'campaign.title'))
      .getCount()

    if (countSameTitleCampaign > 0) {
      throw new ApolloError('활성화된 켐페인중 동일한 이름이 있습니다')
    }

    const campaign = repoCampaign.create(input)

    try {
      await repoCampaign.save(campaign)
    } catch (err) {
      throw new ApolloError(err)
    }

    return campaign
  }

  async getAll() {
    return await this.campaignRepository.find()
  }

  async checkSameTitleCampaign(title: string): Promise<boolean> {
    const countSameTitleCampaign = await this.campaignRepository
      .createQueryBuilder()
      .where(scopeAndWhereSameText(title, 'campaign.title'))
      .getCount()

    if (countSameTitleCampaign > 0) {
      return true
    }
    return false
  }
}
