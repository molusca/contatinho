import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  country_code!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  number!: string;
}
