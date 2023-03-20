import { 
  Get,
  Body, 
  Patch, 
  Param, 
  Delete, 
  Headers,
  Controller,
  HttpCode,
  HttpStatus, 
} from '@nestjs/common';
import { 
  ApiHeader, 
  ApiOkResponse,
  ApiNotFoundResponse, 
  ApiBadRequestResponse,
  ApiTags,
  ApiNoContentResponse, 
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService
    ) {}

  @Get('/admin/getall')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  getAdmin(@Headers() headers: any) {
    return this.usersService.getAdmin(headers)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @ApiHeader({
    name: "authorization",
    description: "User token",
    required: true
  })
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete')
  deleteUser(@Headers() headers: any){
    return this.usersService.deleteUser(headers)
  }
}