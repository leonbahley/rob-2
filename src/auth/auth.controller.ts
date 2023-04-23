import { Controller, Post, Body } from '@nestjs/common';

import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('employee/sign-up')
  signUpEmployee(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto, 'employee');
  }

  @Post('employer/sign-up')
  signUpEmployer(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto, 'company');
  }

  @Post('/log-in')
  login(@Body() logInDto: LogInDto): Promise<{ token: string }> {
    return this.authService.logIn(logInDto);
  }
}
