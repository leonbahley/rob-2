import { IsNotEmpty, IsString } from 'class-validator';

export class VacancyDto {
  @IsNotEmpty()
  @IsString()
  readonly company: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly wage: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
