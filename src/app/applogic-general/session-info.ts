import { TimeDuration } from './time-duration';
import { Member } from './member';
import { EventShift } from './event-shift';

export class SessionInfo extends TimeDuration {
    name: string = "";
    notes: string = "";
    reporting: Member;
    publicRelations: Member;
    //shift: EventShift = new EventShift();

    public static validate(session: SessionInfo): boolean {
        if (!TimeDuration.validate(session))
        { return false; }
        return true;
    }

    public hasCompleteInfo(): boolean {
        if (!this.name) return false;
        if (!this.reporting) return false;
        if (!this.publicRelations) return false;
        return true;
    }
}