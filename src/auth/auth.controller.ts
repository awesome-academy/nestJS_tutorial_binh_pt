import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { I18n, I18nContext } from 'nestjs-i18n';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @I18n() i18n: I18nContext,
    @Body() authDto: AuthDto
  ) {
    return this.authService.createUser(authDto).then(result => {return {message: i18n.t("auth.signup.success")}});
  }

  @Post('/signin')
  signIn(
    @I18n() i18n: I18nContext,
    @Body() authDto: AuthDto
  ): Promise<any> {
    return this.authService.loginUser(authDto).then(result => {return {message: i18n.t("auth.signin.success"), data: result.accessToken}});
  }
}
