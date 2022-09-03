import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApolloError } from 'apollo-server-express'
import { Campaign } from './campaign.entity'
import { CampaignRepository } from './campaign.repository'
import { AddCampaignInput } from './dto/add-campaign.dto'

interface AddCampaignInputAndId extends AddCampaignInput {
  userId: number
}

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignRepository)
    private CampaignRepository: CampaignRepository,
  ) {}

  async addCampaign(input: AddCampaignInputAndId): Promise<Campaign> {
    const repoCampaign = this.CampaignRepository
    const countSameTitleCampaign = await repoCampaign
      .createQueryBuilder()
      .where("replace(campaign.title,' ','') = :inputTitle", {
        inputTitle: input.title.replace(/(\s*)/g, ''),
      })
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

  async checkSameTitleCampaign(title: string): Promise<boolean> {
    const countSameTitleCampaign =
      await this.CampaignRepository.createQueryBuilder()
        .where("replace(campaign.title,' ','') = :inputTitle", {
          inputTitle: title.replace(/(\s*)/g, ''),
        })
        .getCount()

    if (countSameTitleCampaign > 0) {
      return true
    }
    return false
  }
}
