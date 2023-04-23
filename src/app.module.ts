import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UpdateModule } from './employee/update/update.module';
import { UpdateEmployerModule } from './employer/update/update.module';
import { CreateVacancyModule } from './employer/create-vacancy/create-vacancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    AuthModule,
    UpdateEmployerModule,
    UpdateModule,
    CreateVacancyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
