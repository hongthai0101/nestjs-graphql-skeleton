import { Field, InputType } from '@nestjs/graphql';
import { Stream } from 'stream';

@InputType()
export class UploadFileInput {

  @Field()
  filename: string

  @Field()
  mimetype: string

  @Field()
  encoding: string

  @Field(() => Stream)
  createReadStream: any;
}
