import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Authorize } from 'src/auth/roles.decorator';
import { User } from './auth.entity';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthInput, AuthRole } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';
import { SignInAuthInput } from './dto/signIn-auth-credential.dto';
import { RolesGuard } from './role.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => {
    return String;
  })
  signIn(
    @Args('signInAuthInput', ValidationPipe) signInAuthInput: SignInAuthInput,
  ): Promise<string> {
    return this.authService.signIn(signInAuthInput);
  }

  @Query(() => {
    return User;
  })
  getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.authService.getUser(id);
  }

  @Authorize([AuthRole.ADMIN_GUEST])
  @UseGuards(GqlAuthGuard, RolesGuard)
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
