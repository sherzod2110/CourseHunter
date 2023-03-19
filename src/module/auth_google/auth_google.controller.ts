import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthGoogleService } from './auth_google.service';
import { CreateAuthGoogleDto } from './dto/create-auth_google.dto';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';

@Controller('auth-google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Post()
  create(@Body() createAuthGoogleDto: CreateAuthGoogleDto) {
    return this.authGoogleService.create(createAuthGoogleDto);
  }

  @Get()
  findAll() {
    return this.authGoogleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authGoogleService.findOne(+id);
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
