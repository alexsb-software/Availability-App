import { TimeDuration } from '../../applogic-general/time-duration';
import { Member } from '../../applogic-general/member';

export class SessionInfo extends TimeDuration {
    name: string = "";
    notes: string = "";
    reporting: Member;
    publicRelations: Member;
}