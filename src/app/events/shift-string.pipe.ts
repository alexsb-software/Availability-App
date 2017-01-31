import { Pipe, PipeTransform } from '@angular/core';
import { ShortTimeDate } from './short-time-date';

@Pipe({
  name: 'shiftString'
})
export class ShiftStringPipe implements PipeTransform {

  transform(value: ShortTimeDate, args?: any): any {
    return ShortTimeDate.toString(value);
  }

}
