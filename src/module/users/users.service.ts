import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenMiddleware } from 'src/middleWare/token.middleware';



@Injectable()
export class UsersService {
  constructor(
    private readonly tokenmiddleware: TokenMiddleware
  ){}

  async getAdmin(headers: any): Promise<UsersEntity[] | any[]>{
    await this.tokenmiddleware.verifyAdmin(headers)
    //checking admin token
    
    const getAllUsers: UsersEntity[] | any[] = (await UsersEntity.find()).filter(e => delete e.password)
    // deleting users  passwords

    return getAllUsers
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
