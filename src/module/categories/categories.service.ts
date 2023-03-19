import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    return await CategoriesEntity.find({
      relations: {
        course: true,
      },
    }).catch(() => {
      throw new HttpException('Certificate Not Found', HttpStatus.NOT_FOUND);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
