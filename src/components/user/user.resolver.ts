import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from './entities';
import { UserService } from './services/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return [{
      id: "xxxx",
      name: "yyy"
    }];
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => ListUsersResponse, { name: 'listUsersWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  // ): Promise<ListUsersResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { users, count } = await this.usersService.getUsers({
  //     limit,
  //     offset,
  //   });
  //   const page = connectionFromArraySlice(users, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  // @Query(() => UserEntity, { name: 'user' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.findById(id)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => UserEntity)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => UserEntity)
  // removeUser(@Args('id', { type: () => String }) id: string) {
  //   return this.usersService.softDelete(id);
  // }
}