import { Member } from './member';

export class Session {
    name: string;
    startDate: Date;
    endDate: Date;
    reportingMember: Member;
    publicRelationsMember: Member;
}