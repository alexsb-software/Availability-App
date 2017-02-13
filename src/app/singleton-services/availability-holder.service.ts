import { Injectable } from '@angular/core';
import { DayAvailability } from '../applogic-general/day-availability';
import { DayAssignmentInfo, ShiftAssignmentInfo } from '../applogic-general/assignment-info';
import { SessionInfo } from '../applogic-general/session-info';

@Injectable()
export class AvailabilityHolderService {

  constructor() { }

  private _eventAssignmentInfo: DayAssignmentInfo[] = [];

  public get eventAssignmentInfo(): DayAssignmentInfo[] {
    return this._eventAssignmentInfo;
  }

  public set eventAssignmentInfo(v: DayAssignmentInfo[]) {
    this._eventAssignmentInfo = v;
  }


  private _eventAvailability: DayAvailability[] = [];
  public get eventAvailability(): DayAvailability[] {
    return this._eventAvailability;
  }
  public set eventAvailability(v: DayAvailability[]) {
    this._eventAvailability = v;
  }

}
