import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListUserInput {

  @Field(() => String, { description: 'Email of user', nullable: true})
  email: string;

  @Field(() => String, { description: 'Name of user', nullable: true})
  name: string;
}