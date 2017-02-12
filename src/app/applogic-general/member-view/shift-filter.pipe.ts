import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'shiftFilter'
})
export class ShiftFilterPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[], shiftNumber: number): MemberAvailability[] {
    if (!memAvs) {
      console.error("[ShiftFilterPipe] Undefined/Empty Array");
      return memAvs;
    }
    return memAvs.filter(
      (av: MemberAvailability) =>
        av.shiftNumbers.indexOf(shiftNumber) !== -1);
  }
}
