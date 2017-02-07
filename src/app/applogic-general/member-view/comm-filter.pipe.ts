import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'commFilter'
})
export class CommFilterPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[], comm: string): MemberAvailability[] {
    if (!comm || comm.length === 0) return memAvs;

    return memAvs.filter(
      (av: MemberAvailability) =>
        av.availabileCommittees.findIndex(c => c.includes(comm)));
  }

}