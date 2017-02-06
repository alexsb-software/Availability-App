import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';

@Pipe({
  name: 'nameSort'
})
export class NameSortPipe implements PipeTransform {

  transform(memAvs: MemberAvailability[]): MemberAvailability[] {
    return memAvs.sort((mA, mB) => this.isBigger(mA.member.name, mB.member.name));
  }

  private isBigger(str1: string, str2: string): number {
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1))
  }

  /**
   * TODO create a sorting pipeline 
   */
}
