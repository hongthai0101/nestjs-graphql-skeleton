import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UserModule,
    AuthModule,
    FileModule
  ],
})
export class ComponentModule {}
