import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { AuthGoogleController } from './auth_google.controller';
import { GoogleRegisterStrategy } from './strategy/google_register.strategy';
import {JwtModule, JwtService} from '@nestjs/jwt'
import { GoogleLoginStrategy } from './strategy/google_login.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY
    })
  ],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleRegisterStrategy, GoogleLoginStrategy, JwtService]
})
export class AuthGoogleModule {}
