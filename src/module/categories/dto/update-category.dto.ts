import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cat_title: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cat_description: string;
}
