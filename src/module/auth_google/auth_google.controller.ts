import { 
  Controller, 
  UseGuards, 
  Delete, 
  Patch, 
  Param, 
  Body, 
  Get, 
  Req 
} from '@nestjs/common';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';
import { AuthGoogleService } from './auth_google.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Google')
@Controller('auth-google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}


  @Get('/register')
  @UseGuards(AuthGuard('google_register'))
  googleRegisterRedirect(@Req() req: any) {
    console.log(req.user)
    return this.authGoogleService.googleRegister(req)
  }

  @Get('/login')
  @UseGuards(AuthGuard('google_login'))
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
