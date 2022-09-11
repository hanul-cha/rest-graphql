import { Global, Module } from '@nestjs/common'
import { globalDynamicModule } from 'src/globalDynamicModule'
import { ContractService } from './contract.service'

@Global()
@Module({
  imports: [globalDynamicModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
