import {
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { ListUsersInput } from '../dto';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return super.find()
  }

  async getUsers(paginationQuery: ListUsersInput) {
  
    return { users: [], count: 0 };
  }

  async findOneByEmail(email: string) {
    return super.findOne({where: {email}})
  }
}