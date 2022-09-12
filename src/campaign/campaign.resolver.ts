import { ValidationPipe } from '@nestjs/common'
import { Args, Resolver } from '@nestjs/graphql'
import { GuardMutation, GuardQuery } from 'src/decorators/query.decorator'
import { Campaign } from './campaign.entity'
import { AuthRole } from 'src/user/dto/auth-role.dto'
import { ContextUser, Ctx } from 'src/decorators/ctx.decorator'
import { CampaignService } from './campaign.service'
import { AddCampaignInput } from './dto/add-campaign.dto'
import { GraphQLBoolean, GraphQLString } from 'graphql'

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private campaignService: CampaignService) {}

  @GuardMutation({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: Campaign,
  })
  async addCampaign(
    @Args('addCampaignInput', ValidationPipe)
    addCampaignInput: AddCampaignInput,
    @Ctx() user: ContextUser,
  ): Promise<Campaign> {
    return await this.campaignService.addCampaign({
      userId: user.id,
      ...addCampaignInput,
    })
  }

  @GuardQuery({
    return: Campaign,
  })
  async getAll(): Promise<Campaign[]> {
    return await this.campaignService.getAll()
  }

  @GuardQuery({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: GraphQLBoolean,
    options: {
      name: 'sameTitleCampaign',
    },
  })
  async checkSameTitleCampaign(
    @Args('title', { type: () => GraphQLString }) title: string,
  ): Promise<boolean> {
    return await this.campaignService.checkSameTitleCampaign(title)
  }
}
