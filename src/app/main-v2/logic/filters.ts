import { Member } from './member';

type ShiftNumber = number;
export class Filters {
    /**
     * Groups members of the same day by shifts
     */
    public static byShift(members: Member[], dayIndex: number, shiftIndex: number): Member[] {
        return members.filter(m => m.shifts[dayIndex].indexOf(shiftIndex) !== -1);
    }

    public static byCommittee(members: Member[], commName: string): Member[] {
        return members.filter(m => m.committees.indexOf(commName) !== -1);
    }

    public static byDay(members: Member[], dayIndex: number): Member[] {
        if (members.length === 0) throw new EvalError("Empty member list, " + dayIndex);

        return members.filter(m => m.shifts[dayIndex].length > 0);
    }
}
