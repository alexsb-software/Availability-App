import { Injectable, EventEmitter } from '@angular/core';

import { SessionHolderService } from './session-holder.service';
import { Member } from '../logic/member';
import { Session } from '../logic/session';

@Injectable()
export class MemberInfoHolderService {

  public memberAssignmentChanged: EventEmitter<Member> = new EventEmitter<Member>();

  constructor(private sessionInfo: SessionHolderService) {
  }

  members: Member[] = [];
  // public get members(): Member[] {
  //   return this._members;
  // }

  // public set members(v: Member[]) {
  //   this._members = v;
  // }

  isAssignedAtSessionOnly(dayIndex: number, shiftIndex: number, member: Member): boolean {
    let result: boolean = false;
    /**
     * Check if the member is assigned as a PR or R&P
     * in the sessions of this shift
     */

    if (!member.isBusy(dayIndex, shiftIndex)) {
      return false;
    }

    this.sessionInfo.getShiftSessions(dayIndex, shiftIndex).forEach((session: Session) => {
      if (session.publicRelationsMember.isEqualTo(member) || session.reportingMember.isEqualTo(member)) {
        result = true;
        return;
      }
    });

    return result;
  }

  /**
   * Checks if a member is assigned at a shift but NOT a session
   * at the given day, shift
   *
   * @param member Member in question
   */
  isAssignedAtShiftOnly(dayIndex: number, shiftIndex: number, member: Member): boolean {
    return !this.isAssignedAtSessionOnly(dayIndex, shiftIndex, member)
      && member.isBusy(dayIndex, shiftIndex);
  }

}
