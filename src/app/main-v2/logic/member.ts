type DayIndex = number;
type ShiftIndex = number;
type Committee = number;

export class Member {
    committees: Committee[];
    name: string;

    // Shift indexes (0-based)
    shifts: ShiftIndex[];

    // Day indexes (0-based)
    days: DayIndex[];

    // This field is set arbitrrarily, it's used locally
    // by the application logic to find the selected memebrs
    id: number;

    assigned: [DayIndex, ShiftIndex, Committee][];



    // /**
    //  * Marks the member as taken in the gicen shift number
    //  * by the given committee
    //  */
    // public reserve(shiftNum: number, comm: string) {
    //     this.assignedTo.set(shiftNum, comm);
    // }

    // /**
    //  * Releases the member from the given shift number
    //  */
    // public release(shiftNum: number): void {
    //     this.assignedTo.delete(shiftNum);
    // }

    // /**
    //  * Checks whther a member is busy a a given
    //  * shift number
    //  */
    // public isBusy(shiftNum: number): boolean {
    //     return this.assignedTo.has(shiftNum);
    // }

    // /**
    //  * Gets the committee owning the member at the given
    //  * shift number
    //  */
    // public getOwningCommittee(shiftNum: number): string {
    //     return this.assignedTo[shiftNum];
    // }
}
