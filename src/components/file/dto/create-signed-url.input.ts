import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSignedUrlInput {
  
  @Field(() => String)
  contentType: string;

  @Field(() => String)
  filename: string;
}
