import { Member } from './member';
// import { Committee } from './committee.enum';
import { EventShift } from './event-shift';

export class MemberAvailability {
    member: Member;
    availabileCommittee: string;

    /**
     * I'm not sure if including the shiftNumber
     * as a "number" better or using the EventShift
     * object is better.
     */
    shiftNumber: number;
}
