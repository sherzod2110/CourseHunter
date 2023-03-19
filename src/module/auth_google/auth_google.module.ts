import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { AuthGoogleController } from './auth_google.controller';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy]
})
export class AuthGoogleModule {}
