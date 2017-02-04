import { TimeDuration } from './time-duration';
import { Member } from './member';

export class SessionInfo extends TimeDuration {
    name: string = "";
    notes: string = "";
    reporting: Member;
    publicRelations: Member;
}