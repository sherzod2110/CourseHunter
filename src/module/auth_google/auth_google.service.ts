import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGoogleService {
  constructor(
    private readonly jwtservice: JwtService, //jwt service
  ){}


  async googleRegister(req:any): Promise<string| any> {
    const user = req.user
    if(!user) {
      return 'No user from google'
    }

    const findUser = await UsersEntity.findOneBy({password: user.password, email: req.email})
    .catch((): any => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    })
    if(findUser){
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
    }
    //checking user existance


    const {raw: [raw]} = await UsersEntity.createQueryBuilder()
    .insert()
    .into(UsersEntity)
    .values({name: user.firstName, password: user.password, email: user.email})
    .returning(['user_email', 'user_password', 'user_name'])
    .execute()
    .catch((): any => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    })
    // creating new User


    return this.jwtservice.sign(
      {
        id: raw.id, 
        email: raw.email
      }, 
      {
      secret: process.env.SECRET_KEY
      })
  }

  async googleLogin(req: any): Promise<string | any>{
    const user = req.user
    if(!user){
      return 'no user from google'
    }
    
    const findUser = await UsersEntity.findOneBy({password: user.password, email: req.email})
    .catch((): any => {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    })
    
    if(!findUser){
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    }

    return this.jwtservice.sign(
      {
        id: findUser.id, 
        email: findUser.email
      }, 
      {
        secret: process.env.SECRET_KEY
      })
  }
}
