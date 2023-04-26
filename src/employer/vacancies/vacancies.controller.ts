import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { VacanciesService } from './vacancies.service';
import { VacancyDto } from '../dto/vacancy.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post('/create')
  @UseGuards(AuthGuard())
  async createVacancy(
    @Res() response,
    @Body() vacancyDto: VacancyDto,
    @Req() req,
  ) {
    try {
      const vacancy = await this.vacanciesService.createVacancy(
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

  @Get('/company-vacancies')
  @UseGuards(AuthGuard())
  async getCompanyVacancies(@Res() response, @Req() req) {
    try {
      const vacancies = await this.vacanciesService.getCompanyVacancies(
        req.user,
      );
      return response.status(HttpStatus.FOUND).json({
        vacancies,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancies not found',
        error: 'Bad Request',
      });
    }
  }

  @Get('/search')
  async getVacanciesByName(@Res() response, @Query() query) {
    try {
      const vacancies = await this.vacanciesService.getVacanciesByName(query);
      return response.status(HttpStatus.FOUND).json({
        vacancies,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancies not found',
        error: 'Bad Request',
      });
    }
  }

  @Get('/search/:id')
  async getVacancyById(@Res() response, @Param('id') id) {
    try {
      const vacancies = await this.vacanciesService.getVacancyById(id);
      return response.status(HttpStatus.FOUND).json({
        vacancies,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancies not found',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/add-to-favorites')
  @UseGuards(AuthGuard())
  async addToFavorites(@Res() response, @Body() { id }, @Req() req) {
    try {
      const user = await this.vacanciesService.addToFavorites(id, req.user);
      return response.status(HttpStatus.CREATED).json({
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancy not added',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/delete-from-favorites')
  @UseGuards(AuthGuard())
  async deleteFromFavorites(@Res() response, @Body() { id }, @Req() req) {
    try {
      const user = await this.vacanciesService.deleteFromFavorites(
        id,
        req.user,
      );
      return response.status(HttpStatus.CREATED).json({
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancy not removed',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/add-to-applications')
  @UseGuards(AuthGuard())
  async addToApplications(@Res() response, @Body() { id }, @Req() req) {
    try {
      const user = await this.vacanciesService.addToApplications(id, req.user);
      return response.status(HttpStatus.CREATED).json({
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancy not added',
        error: 'Bad Request',
      });
    }
  }

  @Get('/favorites')
  @UseGuards(AuthGuard())
  async getFavorites(@Res() response, @Req() req) {
    try {
      const vacancies = await this.vacanciesService.getFavorites(req.user);
      return response.status(HttpStatus.FOUND).json({
        vacancies,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Vacancies not found',
        error: 'Bad Request',
      });
    }
  }

  @Get('/candidates')
  @UseGuards(AuthGuard())
  async getCandidates(@Res() response, @Req() req) {
    try {
      const candidates = await this.vacanciesService.getCandidates(req.user);
      return response.status(HttpStatus.FOUND).json({
        candidates,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Candidates not found',
        error: 'Bad Request',
      });
    }
  }

  @Get('/candidate/:id')
  async getCandidateById(@Res() response, @Param('id') id) {
    try {
      const candidate = await this.vacanciesService.getCandidateById(id);
      return response.status(HttpStatus.FOUND).json({
        candidate,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Candidate not found',
        error: 'Bad Request',
      });
    }
  }
}
