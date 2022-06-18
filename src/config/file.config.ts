import { registerAs } from '@nestjs/config';

export const fileConfig = registerAs('file', () => ({
  driver: process.env.FILE_DRIVER,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsS3Bucket: process.env.AWS_S3_BUCKET,
  awsS3PrefixUrl: process.env.AWS_S3_PREFIX_URL || 'https://dev-marketplace-assets.aizaworld.com',
  awsS3Region: process.env.AWS_S3_REGION,
  maxFileSize: 5242880, // 5mb,
  expires: 300
}));
