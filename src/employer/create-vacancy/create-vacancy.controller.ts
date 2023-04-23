import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateVacancyService } from './create-vacancy.service';
import { VacancyDto } from '../dto/vacancy.dto';

@Controller('create-vacancy')
export class CreateVacancyController {
  constructor(private readonly createVacancyService: CreateVacancyService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createVacancy(
    @Res() response,
    @Body() vacancyDto: VacancyDto,
    @Req() req,
  ) {
    try {
      const vacancy = await this.createVacancyService.createVacancy(
        vacancyDto,
        req.user,
      );
      return response.status(HttpStatus.CREATED).json({
        vacancy,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancy not added',
        error: 'Bad Request',
      });
    }
  }
}
