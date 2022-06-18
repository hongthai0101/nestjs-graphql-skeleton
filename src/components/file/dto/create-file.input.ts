import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field(() => String)
  url: string;
}
