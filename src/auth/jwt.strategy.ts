import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user = await this.UserModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}
