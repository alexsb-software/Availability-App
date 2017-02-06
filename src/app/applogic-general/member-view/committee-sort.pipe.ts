import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'committeeSort'
})
export class CommitteeSortPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[]): MemberAvailability[] {
    return memAvs.sort((mA, mB) => this.isBigger(mA.availabileCommittee, mB.availabileCommittee));
  }

  private isBigger(str1: string, str2: string): number {
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1))
  }

}
