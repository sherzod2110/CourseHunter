import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { AuthGoogleController } from './auth_google.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import {JwtModule, JwtService} from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY
    })
  ],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy, JwtService]
})
export class AuthGoogleModule {}
