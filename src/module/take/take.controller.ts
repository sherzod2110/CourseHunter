import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TakeService } from './take.service';
import { CreateTakeDto } from './dto/create-take.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('take')
@ApiTags('Take')
export class TakeController {
  constructor(private readonly takeService: TakeService) {}

  @Get('/all')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.takeService.findAll();
  }

  @Post('/create')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: CreateTakeDto) {
    await this.takeService.create(body);
  }

  @Delete('/delete/:id')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.takeService.remove(id);
  }
}
