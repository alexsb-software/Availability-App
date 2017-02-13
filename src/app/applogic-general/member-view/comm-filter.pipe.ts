import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'commFilter'
})
export class CommFilterPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[], comm: string): Member[] {
    if (!comm || comm.length === 0) {
      console.error("[CommFilterPipe] Undefined/Empty Array");
      return memAvs.map(m => m.member);
    }
    
    //console.log(comm);
    //console.log(memAvs);
    // Returns findIndex undefined when not found, which
    // will evaluate to false
    let availabilities: MemberAvailability[] = memAvs.filter(
      (av: MemberAvailability) =>
        av.availabileCommittees.findIndex(c => c.includes(comm)));

    let filteredMembers: Member[] = availabilities.map(av => av.member);
    return filteredMembers;
  }

}