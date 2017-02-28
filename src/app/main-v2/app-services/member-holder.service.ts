import { Injectable } from '@angular/core';
import { Member } from '../logic/member';

@Injectable()
export class MemberHolderService {
  //public members: Member[] = [];
  private dayShifts: Map<number, number> = new Map<number, number>();

  private _members: Member[] = [];
  public get members(): Member[] {
    return this._members;
  }
  public set members(v: Member[]) {
    this._members = v;
  }

  public setShiftCount(dayIndex: number, shiftCount: number): void {
    this.dayShifts.set(dayIndex, shiftCount);
  }

  public getShiftCount(dayIndex: number): number {
    return this.dayShifts.get(dayIndex);
  }

  public removeDay(dayIndex: number): void {
    this.dayShifts.delete(dayIndex);
  }
}
