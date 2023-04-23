import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UpdateService],
  controllers: [UpdateController],
})
export class UpdateEmployerModule {}
