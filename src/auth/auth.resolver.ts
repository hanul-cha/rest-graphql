import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
