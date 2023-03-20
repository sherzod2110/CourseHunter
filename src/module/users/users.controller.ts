import { 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Headers,
  Controller, 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('/admin/getall')
  findOne(@Headers() headers: any) {
    return this.usersService.getAdmin(headers)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
