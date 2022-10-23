import { registerEnumType } from '@nestjs/graphql'
import { GraphQLEnumType } from 'graphql'

export enum ContractState {
  Apply = 'APPLY',
  Approve = 'APPROVE',
  Going = 'GOING',
  Proceeding = 'PROCEEDING',
  Stop = 'Stop',
}

export const GraphQLContractState = new GraphQLEnumType({
  name: 'ContractState',
  values: {
    Apply: {
      value: ContractState.Apply,
    },
    Approve: {
      value: ContractState.Approve,
    },
    Going: {
      value: ContractState.Going,
    },
    Proceeding: {
      value: ContractState.Proceeding,
    },
    Stop: {
      value: ContractState.Stop,
    },
  },
})

registerEnumType(ContractState, { name: 'ContractState' })
