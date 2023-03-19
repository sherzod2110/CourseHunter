import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { CreateAuthGoogleDto } from './dto/create-auth_google.dto';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';
import { GoogleGuard } from './guards/google.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Google')
@Controller('auth-google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  
  @UseGuards(GoogleGuard)
  @Get()
  async get(@Req() req:any): Promise<any> {} 

  @ApiBasicAuth()
  @UseGuards(GoogleGuard)
  @Get('/callback')
  googleAuthRedirect(@Req() req: any) {
    console.log(req.user)
    return this.authGoogleService.googleRegister(req)
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
