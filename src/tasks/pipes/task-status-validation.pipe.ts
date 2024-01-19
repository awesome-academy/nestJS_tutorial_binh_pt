import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';
import { I18nContext } from 'nestjs-i18n';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE,];

  transform(value: any) { //Take an input value, and return the upper case its value
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException([I18nContext.current().t("task.validate.id.not_found")]);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
