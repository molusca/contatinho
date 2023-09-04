import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { CreateEmailDto } from '../../emails/dto/create-email.dto';
import { CreatePhoneDto } from '../../phones/dto/create-phone.dto';

export class CreateContactDto {
  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;

  @IsBoolean()
  @IsOptional()
  is_blocked?: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  full_name!: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsOptional()
  @ArrayNotEmpty()
  @Type(() => CreatePhoneDto)
  @ValidateNested({ each: true })
  phone_numbers?: CreatePhoneDto[];

  @IsOptional()
  @ArrayNotEmpty()
  @Type(() => CreateEmailDto)
  @ValidateNested({ each: true })
  emails?: CreateEmailDto[];

  @IsOptional()
  @ArrayNotEmpty()
  @Type(() => CreateAddressDto)
  @ValidateNested({ each: true })
  addresses?: CreateAddressDto[];
}
