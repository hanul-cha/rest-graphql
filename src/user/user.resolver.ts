import { UseGuards, ValidationPipe } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation as normalMutation,
  Parent,
  Query as normalQuery,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { UserService } from './user.service'
import { CreateAuthInput } from './dto/create-auth-credential.dto'
import { SignInAuthInput } from './dto/signIn-auth-credential.dto'
import { RolesGuard } from '../guard/role.guard'
import { GraphQLInt } from 'graphql'
import { AuthInput, AuthRole } from './dto/auth-role.dto'
import { Query } from 'src/decorators/query.decorator'
import { Authorize } from 'src/decorators/roles.decorator'
import { GqlAuthGuard } from 'src/guard/auth.guard'
import { User } from './user.entity'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @normalQuery(() => {
    return String
  })
  signIn(
    @Args('signInAuthInput', ValidationPipe) signInAuthInput: SignInAuthInput,
  ): Promise<string> {
    return this.userService.signIn(signInAuthInput)
  }

  @Query({
    roles: [AuthRole.ADMIN_GUEST, AuthRole.ADMIN_USER],
    return: User,
  })
  getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUser(id)
  }

  @ResolveField(() => GraphQLInt, {
    name: 'countContract',
  })
  getCountContractByUserId(@Parent() user: User): Promise<number> {
    return this.userService.countContractByUserId(user.id)
  }

  @Authorize(AuthRole.ADMIN_DEVELOPER)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @normalMutation(() => User)
  addRoles(
    @Args('authInput', ValidationPipe) authInput: AuthInput,
  ): Promise<User> {
    return this.userService.addRoles(authInput)
  }

  @normalMutation(() => User)
  createUser(
    @Args('createUserInput', ValidationPipe) createUserInput: CreateAuthInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput)
  }
}
