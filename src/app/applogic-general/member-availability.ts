import { Member } from './member';
import { EventShift } from './event-shift';
/**
 * @summary Availability sheet for 1 member
 * 
 **/
export class MemberAvailability {
    member: Member;
    availabileCommittees: string[];

    /**
     * I'm not sure if including the shiftNumber
     * as a "number" better or using the EventShift
     * object is better. number is used now for the 
     * sake of simplicity
     */
    shiftIndexes: number[];
    /**
     * Shift Number <> Committee assignment mapping
     */
    private assignedTo: Map<number, string> = new Map<number, string>();

    /**
     * Marks the member as taken in the gicen shift number
     * by the given committee
     */
    public reserve(shiftNum: number, comm: string) {
        this.assignedTo.set(shiftNum, comm);
    }

    /**
     * Releases the member from the given shift number
     */
    public release(shiftNum: number): void {
        this.assignedTo.delete(shiftNum);
    }

    /**
     * Checks whther a member is busy a a given
     * shift number
     */
    public isBusy(shiftNum: number): boolean {
        return this.assignedTo.has(shiftNum);
    }

    /**
     * Gets the committee owning the member at the given
     * shift number
     */
    public getOwningCommittee(shiftNum: number): string {
        return this.assignedTo[shiftNum];
    }
}
