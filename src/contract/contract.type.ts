import { InputType, registerEnumType } from '@nestjs/graphql'
import { GraphQLList } from 'graphql'
import { GraphQLInputObjectType } from 'graphql'
import { GraphQLEnumType } from 'graphql'

export enum ContractState {
  Apply = 'APPLY',
  Approve = 'APPROVE',
  Going = 'GOING',
  Proceeding = 'PROCEEDING',
  Stop = 'Stop',
}

export const allContractState = [
  ContractState.Apply,
  ContractState.Approve,
  ContractState.Going,
  ContractState.Proceeding,
  ContractState.Stop,
]

export const GraphQLContractState = new GraphQLEnumType({
  name: 'ContractState',
  values: {
    Apply: {
      value: ContractState.Apply,
      description: '신청: 신청한 직후 기본으로 생성되는 상태',
    },
    Approve: {
      value: ContractState.Approve,
      description: '승인: 캠페인 장이 승인한 상태',
    },
    Going: {
      value: ContractState.Going,
      description: '가는중: 캠페인 장소로 이동중인 상태',
    },
    Proceeding: {
      value: ContractState.Proceeding,
      description: '참여중: 캠페인에 참여중인 상태',
    },
    Stop: {
      value: ContractState.Stop,
      description: '종료',
    },
  },
})

registerEnumType(ContractState, { name: 'ContractState' })
