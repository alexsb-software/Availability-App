import { Member } from './member';

export class Session {
    name: string;
    startDate: Date;
    endDate: Date;
    reportingMember: Member;
    publicRelationsMember: Member;
    shiftIndex: number;
    dayIndex: number;

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
        if (!Session.validateTime(session.startDate, session.endDate))
        { return false; }
        return true;
    }

    public Equals(s2: Session): boolean {
        if (this.dayIndex !== s2.dayIndex) return false;
        if (this.shiftIndex !== s2.shiftIndex) return false;
        if (this.name !== s2.name) return false;
        if (this.endDate.getTime() === s2.endDate.getTime()) return false;
    }
}