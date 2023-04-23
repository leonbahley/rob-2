import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/schemas/user.schema';
import { UpdateDto } from '../dto/update.dto';

@Injectable()
export class UpdateService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async updateProfile(updateProfileDto: UpdateDto, user: User): Promise<User> {
    const { name, email, password, phoneNumbter } = updateProfileDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedContent = await this.userModel.findByIdAndUpdate(
      user._id,
      { phoneNumbter, name, email, hash: hashedPassword },
      { new: true },
    );
    return updatedContent;
  }
}
