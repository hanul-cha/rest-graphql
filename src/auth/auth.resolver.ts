import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth-credential.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateAuthInput,
  ): Promise<User> {
    return this.authService.createUser(createUserInput);
  }
}
