import { Pipe, PipeTransform } from '@angular/core';
import { ShortTimeDate } from './short-time-date';

// This class transforms a given date to the equivalent
// string, it's used in the table of shiftViewer

@Pipe({
  name: 'shiftString'
})
export class ShiftStringPipe implements PipeTransform {

  transform(value: ShortTimeDate, args?: any): any {
    return ShortTimeDate.toString(value);
  }

}
