import { Module } from '@nestjs/common'
import { projectProvider } from './project.repository'
import { ProjectResolver } from './project.resolver'
import { ProjectService } from './project.service'

@Module({
  providers: [ProjectService, ProjectResolver, ...projectProvider],
  exports: [ProjectService],
})
export class ProjectModule {}
