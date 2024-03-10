import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { I18nContext } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userParams: AuthDto): Promise<User> {
    const { username, password } = userParams;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const result = await this.usersRepository.save({
        username,
        password: hashedPassword,
      });
      console.log('result', result);
      return result;
    } catch (error) {
      throw new BadRequestException({
        message: I18nContext.current().t('auth.signup.failed'),
        data: {},
      });
    }
  }

  async loginUser(authDto: AuthDto): Promise<any> {
    const { username, password } = authDto;
    const user = await this.usersRepository.findOneBy({ username: username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException({
        message: I18nContext.current().t(
          'auth.validate.invalid_username_password',
        ),
        data: {},
      });
    }
  }
}
