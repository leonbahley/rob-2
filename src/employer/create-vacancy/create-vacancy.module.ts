import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateVacancyController } from './create-vacancy.controller';
import { AuthModule } from 'src/auth/auth.module';
import { VacancySchema } from 'src/schemas/vacancy.shema';
import { CreateVacancyService } from './create-vacancy.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vacancy', schema: VacancySchema }]),
    AuthModule,
  ],
  providers: [CreateVacancyService],
  controllers: [CreateVacancyController],
})
export class CreateVacancyModule {}
