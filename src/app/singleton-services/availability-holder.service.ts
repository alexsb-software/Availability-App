import { Injectable } from '@angular/core';
import { DayAvailability } from '../applogic-general/day-availability';
import { DayAssignmentInfo, ShiftAssignmentInfo } from '../applogic-general/assignment-info';
import { SessionInfo } from '../applogic-general/session-info';

@Injectable()
export class AvailabilityHolderService {

  constructor() { }

  private _eventAssignmentInfo: DayAssignmentInfo[] = [];

  public get eventAvailability(): DayAssignmentInfo[] {
    return this._eventAssignmentInfo;
  }

  public set eventAvailability(v: DayAssignmentInfo[]) {
    this._eventAssignmentInfo = v;
  }
}
