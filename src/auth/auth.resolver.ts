import { Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth-role.dto';
import { CreateAuthInput } from './dto/create-auth-credential.dto';
import { SignInAuthInput } from './dto/signIn-auth-credential.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  //   @UseGuards(AuthGuard('asdfasdfasdf'))
  signIn(
    @Args('signInAuthInput', ValidationPipe) signInAuthInput: SignInAuthInput,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInAuthInput);
  }

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

  @Query(() => String)
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
