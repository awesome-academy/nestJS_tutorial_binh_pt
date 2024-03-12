import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class CustomValidationRes extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((hash, error) => {
          hash[error.property] = Object.values(error.constraints);
          return hash;
        }, {});

        return new BadRequestException({
          statusCode: 400,
          message: I18nContext.current().t('common.validate_error'),
          errors: formattedErrors,
        });
      },
    });
  }
}
