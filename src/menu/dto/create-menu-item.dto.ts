import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// --- Sub-DTOs para validación anidada ---

class IngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional() // Puede ser string o boolean, una validación más estricta requeriría un custom validator
  allergen: string | boolean;
}

class NutritionDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  calories?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  protein?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  carbs?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  fat?: number;
}

class OptionChoiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  choices: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  extra_price: number[];
}

// --- DTO Principal ---

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsOptional()
  readonly subCategory?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly currency?: string;

  @IsBoolean()
  @IsOptional()
  readonly available?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @IsOptional()
  readonly ingredients?: IngredientDto[];

  @ValidateNested()
  @Type(() => NutritionDto)
  @IsOptional()
  readonly nutrition?: NutritionDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionChoiceDto)
  @IsOptional()
  readonly options?: OptionChoiceDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly images?: string[];

  @IsBoolean()
  @IsOptional()
  readonly alcoholic?: boolean;
}
