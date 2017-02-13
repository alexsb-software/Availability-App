import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from './member-availability';

@Pipe({
  name: 'getCommittee'
})
export class GetCommitteePipe implements PipeTransform {

  transform(value: MemberAvailability[], args?: any): string[] {
    let comms: Set<string> = new Set<string>();
    value.forEach(av => {
      av.availabileCommittees.forEach(c => comms.add(c));
    });

    let retArr: string[] = [];
    comms.forEach(entry => retArr.push(entry));

    return retArr;
  }
}