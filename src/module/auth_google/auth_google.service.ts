import { Injectable } from '@nestjs/common';
import { CreateAuthGoogleDto } from './dto/create-auth_google.dto';
import { UpdateAuthGoogleDto } from './dto/update-auth_google.dto';

@Injectable()
export class AuthGoogleService {
  create(createAuthGoogleDto: CreateAuthGoogleDto) {
    return 'This action adds a new authGoogle';
  }

  googleLogin(req:any) {
      if(!req.user){
        return 'No user from google'
      }
      return req.user
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
