import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCVDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly age: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly desiredPosition: string;

  @IsNotEmpty()
  @IsString()
  readonly workExperience: string;

  @IsNotEmpty()
  @IsString()
  readonly education: string;
}
