import { UseGuards, ValidationPipe } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Authorize } from 'src/decorators/roles.decorator'
import { User } from './user.entity'
import { GqlAuthGuard } from '../guard/auth.guard'
import { UserService } from './user.service'
import { AuthInput, AuthRole } from './dto/auth-role.dto'
import { CreateAuthInput } from './dto/create-auth-credential.dto'
import { SignInAuthInput } from './dto/signIn-auth-credential.dto'
import { RolesGuard } from '../guard/role.guard'
import { GuardQuery } from 'src/decorators/query.decorator'
import { GraphQLInt } from 'graphql'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => {
    return String
  })
  signIn(
    @Args('signInAuthInput', ValidationPipe) signInAuthInput: SignInAuthInput,
  ): Promise<string> {
    return this.userService.signIn(signInAuthInput)
  }

  @GuardQuery({
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
  @Mutation(() => User)
  addRoles(
    @Args('authInput', ValidationPipe) authInput: AuthInput,
  ): Promise<User> {
    return this.userService.addRoles(authInput)
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput', ValidationPipe) createUserInput: CreateAuthInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput)
  }
}
