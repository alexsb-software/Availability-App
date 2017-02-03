import { TimeDuration } from '../../applogic-general/time-duration';
import { ShortTimeDate } from '../../applogic-general/short-time-date';
import { Member } from '../../applogic-general/member';
import { Committee } from '../../applogic-general/committee.enum';

export class SessionInfo extends TimeDuration {
    name: string;
    notes: string;
    reporting: Member;
    publicRelations: Member;

    setReporting(member: Member): boolean {
        if (!this._checkMember(member, Committee.ReportingTeam)) {
            return false;
        }
        this.reporting = member;
        return true;
    }

    setPublicRelations(member: Member): boolean {
        if (!this._checkMember(member, Committee.PublicRelations)) {
            return false;
        }
        this.reporting = member;
        return true;
    }

    validateSession(): boolean {
        return this.reporting &&
            this.publicRelations &&
            this.validate();
    }
    private _checkMember(member: Member, comm: Committee): boolean {
        return member.committee === comm;
    }
}