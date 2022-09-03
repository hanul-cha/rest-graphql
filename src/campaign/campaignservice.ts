import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { CampaignRepository } from './campaign.repository';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignRepository)
    private CampaignRepository: CampaignRepository,
  ) {}

  addCampaign(input: { id }) {}
}
