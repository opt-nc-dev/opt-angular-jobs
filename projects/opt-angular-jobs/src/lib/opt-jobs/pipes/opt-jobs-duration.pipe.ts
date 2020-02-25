import { Pipe, PipeTransform } from '@angular/core';
import { moment } from '../misc/opt-jobs-moment';

@Pipe({
  name: 'optJobsDuration',
})
export class OptJobsDurationPipe implements PipeTransform {

  private formatNumber(value: number) {
    const string = value.toString();
    return `${string.length < 2 ? '0' : ''}${string}`;
  }

  transform(seconds: number) {
    if (seconds === null || seconds === undefined) {
      return null;
    }
    const duration = moment.duration(seconds * 1000);
    return `${this.formatNumber(duration.get('hours'))}:${this.formatNumber(duration.get('minutes'))}:${this.formatNumber(duration.get('seconds'))}`;
  }

}
