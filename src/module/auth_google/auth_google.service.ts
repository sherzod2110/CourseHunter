import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthGoogleDto } from './dto/create-auth_google.dto';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGoogleService {
  constructor(
    private readonly jwtservice: JwtService
  ){}



  async googleRegister(req:any): Promise<string> {
    const user = req.user

    if(!user){
      return 'No user from google'
    }
    const userBody = {
      password: user.password,
      email: user.email
    }

    const findUser = await UsersEntity.findOneBy(userBody)

    if(findUser){
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
    }

    const {raw: [raw]} = await UsersEntity.createQueryBuilder()
    .insert()
    .into(UsersEntity)
    .values(userBody)
    .returning(['*'])
    .execute()

    console.log(raw);
    return this.jwtservice.sign({id: raw.id, email: raw.email})
  }

  findOne(id: number) {
    return `This action returns a #${id} authGoogle`;
  }

  update(id: number, updateAuthGoogleDto: UpdateAuthGoogleDto) {
    return `This action updates a #${id} authGoogle`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGoogle`;
  }
}
