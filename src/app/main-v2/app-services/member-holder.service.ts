import { Injectable } from '@angular/core';
import { Member } from '../logic/member';

@Injectable()
export class MemberHolderService {
  //public members: Member[] = [];
  /**
   * Holds the day
   */
  private dayShifts: Map<number, number> = new Map<number, number>();

  public get getDayShifts(): Map<number, number> {
    return Object.assign(this.dayShifts);
  }

  public get days(): number[] {
    let count: number[] = [];
    this.dayShifts.forEach((v, k) => count.push(k));
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
}
