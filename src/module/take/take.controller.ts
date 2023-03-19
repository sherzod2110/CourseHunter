import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TakeService } from './take.service';
import { CreateTakeDto } from './dto/create-take.dto';
import { UpdateTakeDto } from './dto/update-take.dto';

@Controller('take')
export class TakeController {
  constructor(private readonly takeService: TakeService) {}

  @Post()
  create(@Body() createTakeDto: CreateTakeDto) {
    return this.takeService.create(createTakeDto);
  }

  @Get()
  findAll() {
    return this.takeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.takeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTakeDto: UpdateTakeDto) {
    return this.takeService.update(+id, updateTakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.takeService.remove(+id);
  }
}
