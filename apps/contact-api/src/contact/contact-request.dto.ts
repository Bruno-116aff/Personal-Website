import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class ContactRequestDto {
  @Transform(trim)
  @IsString()
  @Length(1, 100)
  name!: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(5_000)
  message!: string;

  // The field is invisible to people. A value is treated as automated spam.
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
