import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/schemas/user.schema';
import { LogInDto } from './dto/logIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto, type: string): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      if (type === 'employee') {
        const user = await this.UserModel.create({
          name,
          email,
          hash: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
      }
      const user = await this.UserModel.create({
        company: true,
        name,
        email,
        hash: hashedPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email taken');
      }
    }
  }

  async logIn(loginDto: LogInDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.hash);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }
}
