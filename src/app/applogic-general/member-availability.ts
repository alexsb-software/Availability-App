import { Member } from './member';
import { EventShift } from './event-shift';

export class MemberAvailability {
    member: Member;
    availabileCommittees: string[];

    /**
     * I'm not sure if including the shiftNumber
     * as a "number" better or using the EventShift
     * object is better.
     */

    shiftNumbers: number[];
    /**
     * Shift Number <> Committee assignment mapping
     */
    private assignedTo: Map<number, string> = new Map<number, string>();


    public reserve(shiftNum: number, comm: string) {
        this.assignedTo[shiftNum] = comm;
    }

    public release(shiftNum: number): void {
        this.assignedTo.delete(shiftNum);
    }

    public isBusy(shiftNum: number): boolean {
        return this.assignedTo.has(shiftNum);
    }

    public getOwningCommittee(shiftNum: number): string {
        return this.assignedTo[shiftNum];
    }
}
