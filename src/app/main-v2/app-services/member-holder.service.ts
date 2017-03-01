import { Injectable } from '@angular/core';

import { Member } from '../logic/member';
import { Filters } from '../logic/filters';
import { Committee } from '../logic/committee';

@Injectable()
export class MemberHolderService {
  //public members: Member[] = [];
  /**
   * Holds the day
   */
  private dayShifts: Map<number, number> = new Map<number, number>();

  private get getDayShifts(): Map<number, number> {
    return Object.assign(this.dayShifts);
  }

  public get days(): number[] {
    let dayInfo: number[] = [];
    this.dayShifts.forEach((v, k) => dayInfo.push(k));
    return dayInfo;
  }

  public getDayCount(): number {
    let count: number = 0;
    this.getDayShifts.forEach(k => count++);
    return count;
  }

  private _members: Member[] = [];
  public get members(): Member[] {
    return this._members;
  }
  public set members(v: Member[]) {
    this._members = v;
  }

  public setShiftCount(dayIndex: any, shiftCount: number): void {
    dayIndex = parseInt(dayIndex);
    this.dayShifts.set(dayIndex, shiftCount);
  }

  public getShiftCount(dayIndex: any): number {
    dayIndex = parseInt(dayIndex);
    if (!this.dayShifts.has(dayIndex))
      throw new Error("Key not found '" + dayIndex + "'");

    return this.dayShifts.get(dayIndex);
  }

  public removeDay(dayIndex: any): void {
    dayIndex = parseInt(dayIndex);
    this.dayShifts.delete(dayIndex);
  }

  public prettyFormat(): Map<string, Member[]>[] {
    /**
     * Array of arrays
     * --> day
     *      |--> shift
     *              |--> Committee : Member[]
     */
    let daysArray: any[] = [];
    let dayAssignmentInfo: Map<string, Member[]>[] = [];

    this.dayShifts.forEach((shiftCount, k) => {
      // For each day
      let dayTable = new Map<string, Member[]>();

      // Create new entry
      for (let i: number = 0; i < shiftCount; i++) {

        // Create new entry
        for (let comm of Committee.getAll()) {

          // Get members of all committees
          let commMembers: Member[] = Filters.selectedOnlyByCommittee(this.members, k, i, comm);
          dayTable.set(comm, commMembers);
        }
      }
      // Add the day to the collection
      daysArray.push(dayAssignmentInfo);

    });

    return null;
  }
}
