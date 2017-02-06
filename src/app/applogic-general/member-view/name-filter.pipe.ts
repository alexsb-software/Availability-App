import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[], name: string): MemberAvailability[] {
    if (!name || name.length === 0) return memAvs;

    return memAvs.filter(
      (av: MemberAvailability) => av.member.name.includes(name));
  }
}
