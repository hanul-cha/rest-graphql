import { getDataSourceToken } from '@nestjs/typeorm'
import { SourceToken } from 'src/utils/sourceToken'

import { DataSource, Repository } from 'typeorm'
import { Project } from './project.entity'

export class ProjectRepository extends Repository<Project> {
  testWithUser() {
    return this.find({
      where: {
        id: 1,
      },
    })
  }
}

export const projectProvider = [
  {
    provide: SourceToken.Project,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getRepository(Project)
      return new ProjectRepository(
        repository.target,
        repository.manager,
        repository.queryRunner,
      )
    },
    inject: [getDataSourceToken()],
  },
]
