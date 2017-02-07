import { Member } from './member';
// import { Committee } from './committee.enum';
import { EventShift } from './event-shift';

export class MemberAvailability {
    member: Member;
    availabileCommittees: string[];

    /**
     * I'm not sure if including the shiftNumber
     * as a "number" better or using the EventShift
     * object is better.
     */
    shiftNumber: number;
    private busy: boolean = false;
    private owningCommittee: string;

    public reserve(comm: string) {
        this.busy = true;
        this.owningCommittee = comm;
    }

    public release(): void {
        this.busy = false;
        this.owningCommittee = "";
    }

    public isBusy(): boolean {
        return this.busy;
    }

    public getOwningCommittee(): string {
        return this.owningCommittee;
    }
}
