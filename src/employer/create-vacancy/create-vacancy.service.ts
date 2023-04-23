import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vacancy } from 'src/schemas/vacancy.shema';
import { VacancyDto } from '../dto/vacancy.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CreateVacancyService {
  constructor(@InjectModel('Vacancy') private vacancyModel: Model<Vacancy>) {}

  async createVacancy(vacancyDto: VacancyDto, user: User): Promise<Vacancy> {
    const data = Object.assign(vacancyDto, { owner: user._id });
    const addedItem = await new this.vacancyModel(data);
    return addedItem.save();
  }
}
