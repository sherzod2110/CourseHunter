import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { CreateAuthGoogleDto } from './dto/create-auth_google.dto';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth Google')
@Controller('auth-google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}


  @UseGuards(AuthGuard('google_register'))
  @Get('/register')
  googleRegisterRedirect(@Req() req: any) {
    console.log(req.user)
    return this.authGoogleService.googleRegister(req)
  }

  @UseGuards(AuthGuard('google_login'))
  @Get('/login')
  googleLoginRedirect(@Req() req:any){
    return this.authGoogleService.googleLogin(req)
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthGoogleDto: UpdateAuthGoogleDto) {
    return this.authGoogleService.update(+id, updateAuthGoogleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authGoogleService.remove(+id);
  }
}
