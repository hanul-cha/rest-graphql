import { ValidationPipe } from '@nestjs/common'
import { Args, Resolver } from '@nestjs/graphql'
import { Campaign } from './campaign.entity'
import { ContextUser, Ctx } from 'src/decorators/ctx.decorator'
import { CampaignService } from './campaign.service'
import { AddCampaignInput } from './dto/add-campaign.dto'
import { GraphQLBoolean, GraphQLString } from 'graphql'
import { Mutation, Query } from 'src/decorators/query.decorator'
import { AuthRole } from 'src/user/dto/auth-role.dto'

@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private campaignService: CampaignService) {}

  @Mutation({
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

  @Query({
    return: Campaign,
  })
  async getAll(): Promise<Campaign[]> {
    return await this.campaignService.getAll()
  }

  @Query({
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
