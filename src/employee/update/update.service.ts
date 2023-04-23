import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/schemas/user.schema';
import { UpdateProfileDto } from './dto/profile.dto';
import { UpdateCVDto } from './dto/cv.dto';

@Injectable()
export class UpdateService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    user: User,
  ): Promise<User> {
    const { name, email, password } = updateProfileDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedContent = await this.userModel.findByIdAndUpdate(
      user._id,
      { name, email, hash: hashedPassword },
      { new: true },
    );
    return updatedContent;
  }

  async updateCV(updateCVDto: UpdateCVDto, user: User): Promise<User> {
    const updatedContent = await this.userModel.findByIdAndUpdate(
      user._id,
      updateCVDto,
      { new: true },
    );
    return updatedContent;
  }
}
