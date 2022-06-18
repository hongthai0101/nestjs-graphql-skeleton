import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ValidationError } from 'apollo-server-express';
import { CreateSignedUrlOutput, UploadFileInput } from '../dto';

@Injectable()
export class FileService {

  private s3: S3;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('file.accessKeyId'),
      secretAccessKey: this.configService.get('file.secretAccessKey'),
      region: this.configService.get('file.awsS3Region'),
    });
  }

  /**
   * 
   * @param fileName 
   * @param contentType 
   * @returns 
   */
  async signedUrl(
    fileName: string, 
    contentType: string
  ): Promise<CreateSignedUrlOutput> {
    const filePath = `${randomStringGenerator()}-${fileName}`;
    const s3Params = {
      Bucket: this.configService.get('file.awsS3Bucket'),
      Key: filePath,
      Expires: this.configService.get('file.expires'),
      ContentType: contentType
    }

    const uploadURL = await this.s3.getSignedUrlPromise('putObject', s3Params);
    return {
      uploadURL,
      key: filePath
    }
  }

  /**
   * 
   * @param url 
   * @param userId 
   * @returns 
   */
  public async create(url: string, userId: string): Promise<FileEntity> {
    const entity = this.fileRepository.create({
      userId,
      url: this.configService.get('file.awsS3PrefixUrl') + '/' + url
    });
    return this.fileRepository.save(entity);
  }

  /**
   * 
   * @param file 
   * @param userId 
   * @returns 
   */
  async uploadFile(file: UploadFileInput, userId): Promise<FileEntity> {
    if (!file) {
      throw new ValidationError('Please file')
    }

    const { createReadStream, filename, encoding, mimetype } = file
    const fileName = `${randomStringGenerator()}-${filename}`;
    const params = {
      Bucket: this.configService.get('file.awsS3Bucket'),
      Key: fileName,
      ContentEncoding: encoding,
      Body: createReadStream(),
      ContentType: mimetype
    };
    await this.s3.upload(params).promise();

    const item = await this.fileRepository.save(
      this.fileRepository.create({
        url: fileName,
        userId
      }),
    );
    Object.assign(item, { fullPath: this.configService.get('file.awsS3PrefixUrl') + '/' + item.url });
    return item;
  }
}
