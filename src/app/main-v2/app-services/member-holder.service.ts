import { Injectable, EventEmitter } from '@angular/core';

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
  public memberAssignmentChanged: EventEmitter<void> = new EventEmitter<void>();
  public currentDayIndex: number;
  public currentShiftIndex: number;

  private get getDayShifts(): Map<number, number> {
    return Object.assign(this.dayShifts);
  }

  public get days(): number[] {
    let dayInfo: number[] = [];
    this.dayShifts.forEach((shiftCount, dayIndex) => dayInfo.push(shiftCount));
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
}
