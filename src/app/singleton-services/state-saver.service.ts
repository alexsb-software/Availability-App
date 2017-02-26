import { Injectable } from '@angular/core';
import { DayAvailability } from '../applogic-general/day-availability';
import { DayAssignmentInfo, ShiftAssignmentInfo } from '../applogic-general/assignment-info';
import { SessionInfo } from '../applogic-general/session-info';
import { MemberAvailability } from '../applogic-general/member-availability';
@Injectable()
export class StateSaverService {
  private states: Map<string, any> = new Map<string, any>();

  constructor() { }
  save(key: string, object: any) {
    this.states.set(key, object);
  }
  get(key: string): any {
    return this.states.get(key);
  }
  exists(key: string): boolean {
    return this.states.has(key);
  }
  delete(key: string): void {
    if (!this.exists(key)) return;
    this.states.delete(key);
  }

  private _eventAssignmentInfo: DayAssignmentInfo[] = [];

  public get eventAssignmentInfo(): DayAssignmentInfo[] {
    return this._eventAssignmentInfo;
  }

  public set eventAssignmentInfo(v: DayAssignmentInfo[]) {
    this._eventAssignmentInfo = v;
  }

  // Used by the printing component
  private _eventAvailability: DayAvailability[] = [];
  public get eventAvailability(): DayAvailability[] {
    return this._eventAvailability;
  }
  public set eventAvailability(v: DayAvailability[]) {
    this._eventAvailability = v;
  }

  // TODO might be useful later

  // public getShiftAvailability(dayIdx: number, shiftIdx: any): MemberAvailability[] {

  //   shiftIdx = parseInt(shiftIdx);
  //   let result: MemberAvailability[] = [];
  //   let memAvs: MemberAvailability[] = this._eventAvailability[dayIdx].availabilities;

  //   for (let av of memAvs) {
  //     let shifts: number[] = av.shiftIndexes;

  //     shifts.forEach((sh: any) => {
  //       if (sh === shiftIdx) {
  //         result.push(av);
  //         return;
  //       }
  //     });
  //   }
  //   return result;
  // }
}
