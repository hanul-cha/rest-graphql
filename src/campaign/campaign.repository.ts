import { getDataSourceToken } from '@nestjs/typeorm'
import { SourceToken } from 'src/utils/sourceToken'

import { DataSource, Repository } from 'typeorm'
import { Campaign } from './campaign.entity'

export class CampaignRepository extends Repository<Campaign> {
  testWithUser() {
    return this.find({
      where: {
        id: 1,
      },
    })
  }
}

export const campaignProvider = [
  {
    provide: SourceToken.Campaign,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getRepository(Campaign)
      return new CampaignRepository(
        repository.target,
        repository.manager,
        repository.queryRunner,
      )
    },
    inject: [getDataSourceToken()],
  },
]
