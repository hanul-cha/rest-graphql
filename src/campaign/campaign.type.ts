import { GraphQLEnumType } from 'graphql'

export enum CampaignType {
  Homecoming = 'HOMECOMING',
  Playing = 'PLAYING',
}

export const GraphQLCampaignType = new GraphQLEnumType({
  name: 'CampaignType',
  values: {
    Homecoming: {
      value: CampaignType.Homecoming,
    },
    Playing: {
      value: CampaignType.Playing,
    },
  },
})
