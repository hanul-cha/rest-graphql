import { getDataSourceToken } from '@nestjs/typeorm'
import { SourceToken } from 'src/sourceToken'
import { DataSource, Repository } from 'typeorm'
import { Contract } from './contract.entity'

export class ContractRepository extends Repository<Contract> {
  testWithUser() {
    return this.find({
      where: {
        id: 1,
      },
    })
  }
}

export const contractProvider = [
  {
    provide: SourceToken.Contract,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getRepository(Contract)
      return new ContractRepository(
        repository.target,
        repository.manager,
        repository.queryRunner,
      )
    },
    inject: [getDataSourceToken()],
  },
]
