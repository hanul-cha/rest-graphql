import { Global, Module } from '@nestjs/common'
import { contractProvider } from './contract.repository'
import { ContractService } from './contract.service'

@Global()
@Module({
  providers: [ContractService, ...contractProvider],
  exports: [ContractService],
})
export class ContractModule {}
