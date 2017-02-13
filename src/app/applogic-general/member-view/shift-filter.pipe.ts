import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'shiftFilter'
})
export class ShiftFilterPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[], shiftIndex: number): MemberAvailability[] {
    if (!memAvs) {
      console.error("[ShiftFilterPipe] Undefined/Empty Array");
      return memAvs;
    }
    return memAvs.filter(
      (av: MemberAvailability) =>
        av.shiftIndexes.indexOf(shiftIndex) !== -1);
  }
}
