import { TimeDuration } from './time-duration';
import { Member } from './member';
import { EventShift } from './event-shift';

export class SessionInfo extends TimeDuration {
    name: string = "";
    notes: string = "";
    reporting: Member;
    publicRelations: Member;
    shift: EventShift = new EventShift();

    public static validate(session: SessionInfo): boolean {
        if (!TimeDuration.validate(session))
        { return false; }
        else if (session.shift && isNaN(session.shift.number) == false) {
            return true;
        }
        return false;
    }
}