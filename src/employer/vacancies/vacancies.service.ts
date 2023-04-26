import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Vacancy } from 'src/schemas/vacancy.shema';
import { VacancyDto } from '../dto/vacancy.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel('Vacancy') private vacancyModel: Model<Vacancy>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createVacancy(vacancyDto: VacancyDto, user: User): Promise<Vacancy> {
    const data = Object.assign(vacancyDto, { owner: user._id });
    const addedItem = await new this.vacancyModel(data);
    return addedItem.save();
  }

  async getCompanyVacancies(user: User): Promise<Vacancy[]> {
    const data = await this.vacancyModel.find({ owner: user._id });
    return data;
  }

  async getVacanciesByName(query: { query: string }): Promise<Vacancy[]> {
    const data = await this.vacancyModel.find({
      $or: [
        { company: { $regex: query.query, $options: 'i' } },
        { address: { $regex: query.query, $options: 'i' } },
        { name: { $regex: query.query, $options: 'i' } },
      ],
    });
    return data;
  }

  async getVacancyById(id: string): Promise<Vacancy> {
    const data = await this.vacancyModel.findOne({ _id: id });
    return data;
  }

  async addToFavorites(id: string, user: User): Promise<User> {
    const data = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { favorites: id } },
    );
    return data;
  }

  async deleteFromFavorites(id: string, user: User): Promise<User> {
    const data = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $pull: { favorites: id } },
    );
    return data;
  }

  async addToApplications(id: string, user: User): Promise<User> {
    await this.vacancyModel.findOneAndUpdate(
      { _id: id },
      { $push: { applications: user._id } },
    );
    const data = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { applications: id } },
    );
    return data;
  }

  async getFavorites(user: User): Promise<Vacancy[]> {
    const data = await this.userModel.find({ _id: user._id });
    const vacIds = data[0].favorites;
    const vacancies = await this.vacancyModel
      .find()
      .where('_id')
      .in(vacIds)
      .exec();

    return vacancies;
  }

  async getCandidates(user: User): Promise<User[]> {
    const vacancies = await this.vacancyModel.find({ owner: user._id });

    const applicationsArr = vacancies.flatMap((item) => item.applications);

    const candidates = await this.userModel
      .find()
      .where('_id')
      .in(applicationsArr)
      .exec();

    return candidates;
  }

  async getCandidateById(id: string): Promise<User> {
    const data = await this.userModel.findOne({ _id: id });
    return data;
  }
}
