import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/components/user/entities';

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String, { description: 'Generated access_token of the user' })
  accessToken: string;

  @Field(() => UserEntity, { description: 'The data of user' })
  user: UserEntity;
}