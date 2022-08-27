import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Authorize } from 'src/decorators/roles.decorator';
import { User } from './auth.entity';
import { GqlAuthGuard } from '../guard/auth.guard';
import { AuthService } from './auth.service';
import { AuthInput, AuthRole } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';
import { SignInAuthInput } from './dto/signIn-auth-credential.dto';
import { RolesGuard } from '../guard/role.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => {
    return String;
  })
  signIn(
    @Args('signInAuthInput', ValidationPipe) signInAuthInput: SignInAuthInput,
  ): Promise<string> {
    return this.authService.signIn(signInAuthInput);
  }

  @Authorize([AuthRole.ADMIN_GUEST])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => {
    return User;
  })
  getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.authService.getUser(id);
  }

  @Authorize([AuthRole.ADMIN_GUEST])
  @UseGuards(GqlAuthGuard, RolesGuard) // GqlAuthGuard하나만 쓰면 안에 jwt 하고 RolesGuard옵션으로 추가 role검사하기
  @Mutation(() => User)
  addRoles(
    @Args('authInput', ValidationPipe) authInput: AuthInput,
  ): Promise<User> {
    return this.authService.addRoles(authInput);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput', ValidationPipe) createUserInput: CreateAuthInput,
  ): Promise<User> {
    return this.authService.createUser(createUserInput);
  }
}
