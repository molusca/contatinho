import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  label?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street!: string;

  @IsNotEmpty()
  @IsInt()
  number!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complement?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  city!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  state!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  country!: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  zip_code?: string;
}
