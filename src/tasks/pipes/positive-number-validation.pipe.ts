import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class PositiveNumberValidationPipe implements PipeTransform {
  async transform(value: string) {
    const asNum = Number(value);

    if (Number.isNaN(asNum)) {
      throw new BadRequestException(
        I18nContext.current().t('common.errors.positive_id'),
      );
    }
    return value;
  }
}
