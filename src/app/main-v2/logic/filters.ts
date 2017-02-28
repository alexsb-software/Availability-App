import { Member } from './member';
import { Committee, CommitteeEnum } from './committee';
type ShiftNumber = number;
export class Filters {
    /**
     * Groups members of the same day by shifts
     */
    public static byShift(members: Member[], dayIndex: number, shiftIndex: number): Member[] {
        return members.filter(m => m.shifts[dayIndex].indexOf(shiftIndex) !== -1);
    }

    public static byCommittee(members: Member[], commName: string | CommitteeEnum): Member[] {
        let searchKey: string;

        if (typeof commName === "CommitteeEnum" || "number") {
            searchKey = Committee.getCommittee(<CommitteeEnum>commName);
        }
        else {
            searchKey = <string>commName;
        }
        searchKey = searchKey.trim();
        return members.filter(m => m.committees.indexOf(searchKey) !== -1);
    }

    public static byDay(members: Member[], dayIndex: number): Member[] {
        console.debug("Day Index:", dayIndex);

        if (members.length === 0) throw new EvalError("Empty member list, " + dayIndex);

        return members.filter(m => m.shifts[dayIndex].length > 0);
    }
}
