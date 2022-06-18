import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileService } from './services';
import { CreateFileInput, CreateSignedUrlInput, CreateSignedUrlOutput, UploadFileInput } from './dto';
import { FileEntity } from './entities';
import { User } from '../auth/auth.decorator';
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js')

@UseGuards(JwtAuthGuard)
@Resolver(() => FileEntity)
export class FileResolver {
  constructor(private readonly fileService: FileService) { }

  @Mutation(() => FileEntity, {name: 'FileUpload'})
  upload(
    @Args('file', { type: () => GraphQLUpload }) file: UploadFileInput,
    @User('id') userId: string
  ) {
    return this.fileService.uploadFile(file, userId);
  }

  @Query(() => CreateSignedUrlOutput, {name: 'FileSignedUrl'})
  getSignedUrl(
    @Args('input') {filename, contentType}: CreateSignedUrlInput
  ): Promise<CreateSignedUrlOutput> {
    return this.fileService.signedUrl(filename, contentType);
  }

  @Mutation(() => FileEntity, {name: 'FileCreate'})
  create(
    @Args('input') {url}: CreateFileInput,
    @User('id') userId: string
  ) {
    return this.fileService.create(url, userId);
  }
}