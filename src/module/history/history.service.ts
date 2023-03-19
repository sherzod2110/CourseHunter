import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HistoryEntity } from 'src/entities/history.entity';
import { UsersEntity } from 'src/entities/users.entity';

@Injectable()
export class HistoryService {
  async validateUser(userId: string): Promise<UsersEntity> {
    const findUser: UsersEntity = await UsersEntity.findOne({
      where: {
        id: userId,
      },
    }).catch(() => {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return findUser;
  }

  async get(id: string) {
    const findUser: any = await this.validateUser(id);

    return await HistoryEntity.find({
      relations: {
        history_course: true,
      },
      where: {
        history_user: findUser.id,
      },
    });
  }
}
