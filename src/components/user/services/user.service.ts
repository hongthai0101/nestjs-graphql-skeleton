import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { BaseService } from 'src/base';
import ConnectionArgs, { getPagingParameters } from 'src/utils/relay/connection.args';
import { ListUserInput, ListUserOutput } from '../dto';
import { connectionFromArraySlice } from 'graphql-relay';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  async findOneByEmail(email: string) {
    return super.findOne({where: {email}})
  }

  /**
   * 
   * @param args 
   * @param params 
   * @returns 
   */
  async findAll(
    args: ConnectionArgs,
    params: ListUserInput
  ): Promise<ListUserOutput> {
    const { limit, offset } = getPagingParameters(args);
    let filter: FindManyOptions<UserEntity> = {
      take: limit, skip: offset
    }
    const {email, name} = params
    let where = {}
    if(email) where = {...where, email: Like(`%${email}%`)}
    if(name) where = {...where, name: Like(`%${name}%`)}
    if(name || name) filter = {...filter, where}

    const [users, count] = await Promise.all([
      super.find(filter),
      super.count(filter)
    ])
    const page = connectionFromArraySlice(users, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}