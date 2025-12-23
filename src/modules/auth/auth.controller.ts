import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithMobDto } from './dto/loginWithMob.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/mobile')
  @HttpCode(200)
  loginWithMobile(@Body() loginWithMobDto: LoginWithMobDto) {
    return this.authService.loginWithMobile(loginWithMobDto);
  }

  @Post('login/email')
  @HttpCode(200)
  loginWithEmail() {
    return this.authService.loginWithEmail();
  }

  @Post('login/google')
  @HttpCode(200)
  loginWithGoogle() {
    return this.authService.loginWithGoogle();
  }
}
