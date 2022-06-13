import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of the user' })
  name: string;
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'role of the user' })
  role: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
