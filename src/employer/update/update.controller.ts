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
import { UpdateDto } from '../dto/update.dto';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Patch('/company-profile')
  @UseGuards(AuthGuard())
  async updateProfile(
    @Res() response,
    @Body() updateDto: UpdateDto,
    @Req() req,
  ) {
    try {
      const updatedContent = await this.updateService.updateProfile(
        updateDto,
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
