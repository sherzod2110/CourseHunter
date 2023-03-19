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


  async googleRegister(req:any): Promise<string| any> {
    const user = req.user

    if(!user){
      return 'No user from google'
    }

    const findUser = await UsersEntity.findOneBy({password: user.password, email: req.email})

    if(findUser){
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
    }

    const {raw: [raw]} = await UsersEntity.createQueryBuilder()
    .insert()
    .into(UsersEntity)
    .values({name: user.firstName, password: user.password, email: user.email})
    .returning(['user_email', 'user_password', 'user_name'])
    .execute()

    console.log(raw);
    return this.jwtservice.sign({id: raw.id, email: raw.email}, {secret: process.env.SECRET_KEY})
  }

  async googleLogin(req: any): Promise<string | any>{
    const user = req.user

    if(!user){
      return 'no user from google'
    }
    
    const findUser = await UsersEntity.findOneBy({password: user.password, email: req.email})

    if(!findUser){
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    }

    return this.jwtservice.sign({id: findUser.id, email: findUser.email},{secret: process.env.SECRET_KEY})
  }



  update(id: number, updateAuthGoogleDto: UpdateAuthGoogleDto) {
    return `This action updates a #${id} authGoogle`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGoogle`;
  }
}
