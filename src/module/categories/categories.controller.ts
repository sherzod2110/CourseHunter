import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiHeader } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'admin_token',
    description: 'Admin token',
    required: true
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'cat_title', 'cat_description', 'cat_image'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        cat_title: {
          type: 'string',
        },
        cat_description: {
          type: 'string',
        },
      }
    }
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @UseInterceptors(FileInterceptor('categories'))
  async uploadfile(
    // @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('list')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
