import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ContractState, GraphQLContractState } from './contract.type'

@Entity({ name: 'contract' })
@ObjectType()
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Field(() => Number)
  @Column({ type: Number, name: 'user_id' })
  userId: number

  @Field(() => Number)
  @Column({ type: Number, name: 'project_id' })
  projectId: number

  @Field(() => ContractState)
  @Column({ type: String })
  state: ContractState

  @Column({
    type: 'timestamp',
    name: 'created_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: number

  @Column({
    type: 'timestamp',
    name: 'update_at',
    readonly: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: number
}
