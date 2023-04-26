import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VacanciesController } from './vacancies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { VacancySchema } from 'src/schemas/vacancy.shema';
import { VacanciesService } from './vacancies.service';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vacancy', schema: VacancySchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  providers: [VacanciesService],
  controllers: [VacanciesController],
})
export class VacancyModule {}
