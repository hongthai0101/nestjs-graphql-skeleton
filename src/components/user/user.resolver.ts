import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from './entities';
import { UserService } from './services/user.service';
import ConnectionArgs from 'src/utils/relay/connection.args';
import { ListUserOutput, ListUserInput, UpdateUserInput } from './dto';
import { Roles } from '../role/roles.decorator';
import { RolesGuard } from '../role/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserEntity)
  createUser(@Args('input') params: CreateUserInput) {
    return this.userService.create(params);
  }

  @Query(() => ListUserOutput, { name: 'UserList' })
  @Roles(1)
  async findAll(
    @Args('args') args: ConnectionArgs,
    @Args('filter') filter: ListUserInput
  ): Promise<ListUserOutput> {
    console.log(2222);
    
      return this.userService.findAll(args, filter)
  }

  @Query(() => UserEntity, { name: 'UserItem' })
  @Roles(1)
  findOne(
    @Args('id', { type: () => String }) id: string
  ) {
    return this.userService.findById(id)
  }

  @Mutation(() => UserEntity, {name: 'UserUpdate'})
  @Roles(1)
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateUserInput
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserEntity, {name: 'UserRemove'})
  @Roles(2)
  remove(
    @Args('id', { type: () => String }) id: string
  ) {
    return this.userService.softDelete(id);
  }
}