import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import {} from '@nestjs/graphql'
import { AuthService } from 'src/auth/auth.service'
import { LoginResponse } from 'src/auth/dto/login-response'
import { LoginUserInput } from 'src/auth/dto/login-user.input'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
    return this.authService.login(context.user)
  }
}
