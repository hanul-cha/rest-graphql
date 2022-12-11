import { ValidationPipe } from '@nestjs/common'
import { Args, Resolver } from '@nestjs/graphql'
import { ContextUser, Ctx } from 'src/decorators/ctx.decorator'
import { ProjectService } from './project.service'
import { AddProjectInput } from './dto/add-project.dto'
import { GraphQLBoolean, GraphQLString } from 'graphql'
import { Mutation, Query } from 'src/decorators/query.decorator'
import { AuthRole } from 'src/user/dto/auth-role.dto'
import { Project } from './project.entity'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: Project,
  })
  async addProject(
    @Args('addProjectInput', ValidationPipe)
    addProjectInput: AddProjectInput,
    @Ctx() user: ContextUser,
  ): Promise<Project> {
    return await this.projectService.addProject({
      userId: user.id,
      ...addProjectInput,
    })
  }

  @Query({
    return: Project,
  })
  async getAll(): Promise<Project[]> {
    return await this.projectService.getAll()
  }

  @Query({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: GraphQLBoolean,
    options: {
      name: 'sameTitleProject',
    },
  })
  async checkSameTitleProject(
    @Args('title', { type: () => GraphQLString }) title: string,
  ): Promise<boolean> {
    return await this.projectService.checkSameTitleProject(title)
  }
}
