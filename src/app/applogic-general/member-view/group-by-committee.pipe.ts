import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from '../member-availability';
import { Member } from '../member';
import { Committee, CommitteeEnum } from '../committee';
@Pipe({
  name: 'groupByCommittee'
})
/**
 * Transforms the member availability array to
 * a map of committee name : member[]
 * 
 * and adds all members to logistics
 */
export class FilterAvailbleMembersPipe implements PipeTransform {

  transform(memberAvailabilities: MemberAvailability[], shiftIdx: number): Map<string, Member[]> {
    let result = new Map<string, Member[]>();
    let logistics: Member[] = [];

    // Each mA represents a single member
    for (let mA of memberAvailabilities) {
      
      if (mA.isBusy(shiftIdx)) continue;
      
      // Add the member to logistics
      logistics.push(mA.member);

      // Place the member in the corresponding committee
      for (let com of mA.availabileCommittees) {

        // Define the entry if it doesn't exist
        if (!result.has(com)) result.set(com, []);

        // Add the member to the corresponding committee
        let commMembers: Member[] = result.get(com);
        commMembers.push(mA.member);
        result.set(com, commMembers);
      }

    }
    // Add the logistics entry
    result.set(Committee.getCommittee(CommitteeEnum.Logistics), logistics);

    return result;
  }
}
