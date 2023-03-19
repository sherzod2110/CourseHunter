import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  cat_title: string;

  @IsString()
  @IsNotEmpty()
  cat_image: string;

  @IsString()
  @IsNotEmpty()
  cat_description: string;
}
