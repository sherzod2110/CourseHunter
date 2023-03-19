import { PartialType } from '@nestjs/swagger';
import { CreateAuthGoogleDto } from './create-auth_google.dto';

export class UpdateAuthGoogleDto extends PartialType(CreateAuthGoogleDto) {}
