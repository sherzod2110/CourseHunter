import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async deleteUser(headers: any): Promise<void> {
    const getUserId = await this.tokenmiddleware.verifyUser(headers)
    .catch((err: unknown): any => {
      throw new HttpException('bad request in token', HttpStatus.BAD_REQUEST)
    })
    
    await UsersEntity
    .delete({
      id: getUserId
    })
    .catch((err: unknown): any => {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST)
    })
  }
}
