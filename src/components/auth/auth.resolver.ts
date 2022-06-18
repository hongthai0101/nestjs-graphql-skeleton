import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from '../user/entities';
import { AuthLoginInput, AuthLoginOutput, AuthRegisterInput, AuthUpdateInput } from './dto';
import { AuthService } from './auth.service';
import { User } from './auth.decorator';
@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => UserEntity, { name: 'AuthRegister' })
  register(
    @Args('input') params: AuthRegisterInput
  ) {
    return this.authService.userService.create(params);
  }

  @Mutation(() => AuthLoginOutput, { name: 'AuthLogin' })
  login(
    @Args('input') params: AuthLoginInput
  ) {
    return this.authService.login(params);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity, { name: 'AuthProfile' })
  profile(
    @User('id') id: string
  ) {
    return this.authService.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity, { name: 'AuthUpdateProfile' })
  updateProfile(
    @Args('input') params: AuthUpdateInput,
    @User('id') id: string
  ) {
    return this.authService.updateProfile(id, params);
  }
}