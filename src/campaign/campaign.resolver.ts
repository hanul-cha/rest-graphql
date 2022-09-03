import { UseGuards, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Authorize } from 'src/decorators/roles.decorator';
import { RolesGuard } from '../guard/role.guard';
import { GuardMutation, GuardQuery } from 'src/decorators/query.decorator';
import { GraphQLInt } from 'graphql';
import { Campaign } from './campaign.entity';
import { AuthRole } from 'src/auth/dto/auth-role.dto';
import { ContextUser, Ctx } from 'src/decorators/ctx.decorator';
import { CampaignService } from './campaignservice';

@Resolver(() => Campaign)
export class AuthResolver {
  constructor(private CampaignService: CampaignService) {}

  @GuardMutation({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: Campaign,
  })
  getUser(
    @Args('id', { type: () => Int }) id: number,
    @Ctx() user: ContextUser,
  ) {
    return this.CampaignService.addCampaign({
      id: user.id,
    });
  }
}
