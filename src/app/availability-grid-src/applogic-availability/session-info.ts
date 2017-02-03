import { TimeDuration } from '../../applogic-general/time-duration';
import { Member, Committee } from '../../applogic-general/member';

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
            TimeDuration.validate(this);
    }
    private _checkMember(member: Member, comm: Committee): boolean {
        return member.committee === comm;
    }
}