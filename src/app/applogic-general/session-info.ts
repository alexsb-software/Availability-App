import { TimeDuration } from './time-duration';
import { Member } from './member';
import { EventShift } from './event-shift';

export class SessionInfo extends TimeDuration {
    name: string = "";
    notes: string = "";
    reporting: Member;
    publicRelations: Member;
    private shift: EventShift = new EventShift();
    /**
     * IMPORTANT this is added to be easily displayed in the dynamic table
     */
    shiftNumber: number = this.shift.number;// (SessionInfo.getShiftNumber(this));

    setShift(shift: EventShift): void {
        this.shift = shift;
        this.shiftNumber = this.shift.number
    }

    getShift(): EventShift {
        return this.shift;
    }

    private static getShiftNumber(session: SessionInfo): number {
        return session.shift.number;
    }
    public static validate(session: SessionInfo): boolean {
        if (!TimeDuration.validate(session))
        { return false; }
        else if (session.shift && isNaN(session.shift.number) == false) {
            return true;
        }
        return false;
    }
}