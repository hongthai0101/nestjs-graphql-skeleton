import { UserEntity } from '../entities/user.entity';
import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/utils/relay/relay.types';


@ObjectType()
export class ListUserOutput extends RelayTypes<UserEntity>(UserEntity) {}