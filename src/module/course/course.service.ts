import { GetTaskFilterDto } from './dto/get-search-filter';
import { CoursesEntity } from './../../entities/courses.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  async byCategory() {
    return await CoursesEntity.find()
  }

  async findAll() {
    return await CoursesEntity.find().catch(() => {
      throw new HttpException('BAD GATEWAY', HttpStatus.BAD_GATEWAY);
    });
  }

  // getTaskWithFilter(filterDto: GetTaskFilterDto): any {
  //   const { search } = filterDto;

  //   let tasks: any = this.findAll();

  //   if (search) {
  //     tasks = tasks.filter((task) => 
  //       task.title.includes(search)
  //     );
  //   }

  //   return tasks;
  // }

  async create(createCourseDto: CreateCourseDto, imgLink: any) {
    await CoursesEntity.createQueryBuilder()
      .insert()
      .into(CoursesEntity)
      .values({
        title: createCourseDto.title,
        image: imgLink,
        lang: createCourseDto.lang,
        description: createCourseDto.description,
      })
      .execute()
      .catch(() => {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, imgLink: any) {
    const course = await CoursesEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    await CoursesEntity.createQueryBuilder()
      .update()
      .set({
        title: updateCourseDto.title || course.title,
        image: imgLink || course.image,
        lang: updateCourseDto.lang || course.lang,
        description: updateCourseDto.description || course.description,
      })
      .where({
        id: id,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const course = await CoursesEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    await CoursesEntity.createQueryBuilder()
      .delete()
      .from(CoursesEntity)
      .where({
        id: id,
      })
      .execute()
      .catch((err) => {
        console.log(err);
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }
}
