import { Module } from '@nestjs/common';
import { FileService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities';
import { FileResolver } from './file.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity])
  ],
  providers: [FileService, FileResolver],
  exports: [],
})
export class FileModule { }
