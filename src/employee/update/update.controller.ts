import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UpdateProfileDto } from './dto/profile.dto';
import { UpdateService } from './update.service';
import { UpdateCVDto } from './dto/cv.dto';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Patch('/profile')
  @UseGuards(AuthGuard())
  async updateProfile(
    @Res() response,
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req,
  ) {
    try {
      const updatedContent = await this.updateService.updateProfile(
        updateProfileDto,
        req.user,
      );
      return response.status(HttpStatus.CREATED).json({
        updatedContent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Content not updated',
        error: 'Bad Request',
      });
    }
  }

  @Patch('/cv')
  @UseGuards(AuthGuard())
  async updateCV(
    @Res() response,
    @Body() updateCVDto: UpdateCVDto,
    @Req() req,
  ) {
    try {
      const updatedContent = await this.updateService.updateCV(
        updateCVDto,
        req.user,
      );
      return response.status(HttpStatus.CREATED).json({
        updatedContent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Content not updated',
        error: 'Bad Request',
      });
    }
  }
}
