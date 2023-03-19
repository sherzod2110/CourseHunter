import { PartialType } from '@nestjs/swagger';
import { CreateTakeDto } from './create-take.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateTakeDto extends PartialType(CreateTakeDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'month',
    type: 'number',
  })
  month: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'price',
    type: 'string',
  })
  price: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'user',
    type: 'string',
  })
  user: string;
}
