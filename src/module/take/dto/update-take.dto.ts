import { PartialType } from '@nestjs/swagger';
import { CreateTakeDto } from './create-take.dto';

export class UpdateTakeDto extends PartialType(CreateTakeDto) {}
