import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenMiddleware } from 'src/middleWare/token.middleware';

@Injectable()
export class AuthGoogleService {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly tokenmiddleware: TokenMiddleware
  ){}


  async googleRegister(req:any): Promise<string| any> {
    const user = req.user

    if(!user) {
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
    return this.jwtservice.sign({
        id: raw.id, 
        email: raw.email
      }, {
        secret: process.env.SECRET_KEY
      })
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

    return this.jwtservice.sign({
        id: findUser.id, 
        email: findUser.email
      },{
        secret: process.env.SECRET_KEY
      })
  }

  async getAdmin(headers: any): Promise<UsersEntity[]>{
    this.tokenmiddleware.verifyAdmin(headers) //checking admin token
    
    const findAllUser: any[] = (await UsersEntity.find()).filter(e => delete e.password) // deleting users passwords
    return findAllUser
  }

  update(id: number, updateAuthGoogleDto: UpdateAuthGoogleDto) {
    return `This action updates a #${id} authGoogle`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGoogle`;
  }
}
