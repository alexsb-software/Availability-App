import {Member} from './member';

export class Session {
  name: string;
  startDate: Date;
  endDate: Date;
  reportingMember: Member;
  publicRelationsMember: Member;
  shiftIndex: number = 0;
  dayIndex: number = 0;

  private static validateTime(startDate: Date, endDate: Date): boolean {

    let checkExistence: boolean = false;

    if (startDate && endDate) {
      checkExistence = true;
    }

    if (checkExistence) {
      return (startDate < endDate);
    }
    return false;
  }

  public static validate(session: Session): boolean {
    return Session.validateTime(session.startDate, session.endDate);

  }

  private static maxId: number = 0;
  private id: number;

  constructor() {
    // Create an identifying ID for each session
    this.id = Session.maxId;
    Session.maxId++;
  }

  public isEqualTo(s2: Session): boolean {
    return this.id === s2.id;
  }
}
