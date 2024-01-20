import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromHeader('jwt-token'),
    });
  }

  async validate(payload): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ username: payload.username });
    if (!user) throw new HttpException(I18nContext.current().t("common.invalid_token"), HttpStatus.UNAUTHORIZED);
    return user;
  }
}
