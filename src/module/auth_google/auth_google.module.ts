import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { AuthGoogleController } from './auth_google.controller';

@Module({
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService]
})
export class AuthGoogleModule {}
