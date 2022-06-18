import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateSignedUrlOutput {

  @Field(() => String, {description: 'Url of file'})
  uploadURL: string;

  @Field(() => String, {description: 'Filename of file'})
  key: string;
}
