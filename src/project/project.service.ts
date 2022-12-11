import { Inject, Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { scopeAndWhereSameText } from 'src/scope/scopeAndWhereSameText'
import { SourceToken } from 'src/utils/sourceToken'
import { AddProjectInput } from './dto/add-project.dto'
import { Project } from './project.entity'
import { ProjectRepository } from './project.repository'

@Injectable()
export class ProjectService {
  constructor(
    @Inject(SourceToken.Project)
    private projectRepository: ProjectRepository,
  ) {}

  async addProject(
    input: AddProjectInput & {
      userId: number
    },
  ): Promise<Project> {
    const repoProject = this.projectRepository
    const countSameTitleProject = await repoProject
      .createQueryBuilder()
      .where(scopeAndWhereSameText(input.title, 'project.title'))
      .getCount()

    if (countSameTitleProject > 0) {
      throw new ApolloError('활성화된 켐페인중 동일한 이름이 있습니다')
    }

    const project = repoProject.create(input)

    try {
      await repoProject.save(project)
    } catch (err) {
      throw new ApolloError(err)
    }

    return project
  }

  async getAll() {
    return await this.projectRepository.find()
  }

  async checkSameTitleProject(title: string): Promise<boolean> {
    const countSameTitleProject = await this.projectRepository
      .createQueryBuilder()
      .where(scopeAndWhereSameText(title, 'project.title'))
      .getCount()

    if (countSameTitleProject > 0) {
      return true
    }
    return false
  }
}
