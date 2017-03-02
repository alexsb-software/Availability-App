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

        if (typeof commName === "CommitteeEnum" || typeof commName === "number") {
            searchKey = Committee.getCommittee(<CommitteeEnum>commName);
        }
        else {
            searchKey = <string>commName;
        }
        searchKey = searchKey.trim();

        if (searchKey === Committee.getCommittee(CommitteeEnum.Logistics)) {
            return members;
        }

        return members.filter(m => m.committees.indexOf(searchKey) !== -1);
    }

    public static byDay(members: Member[], dayIndex: number): Member[] {
        if (members.length === 0) throw new EvalError("Empty member list, " + dayIndex);

        return members.filter(m => m.shifts[dayIndex].length > 0);
    }

    /**
     * Applies the isBusy() function on provided members
     */
    public static selectedInShift(members: Member[], dayIndex: number, shiftIndex: number): Member[] {
        console.assert(typeof members !== "undefined", "Members are un defined");
        /**
         * Filter returns an empty array when nothing is found
         */
        return members.filter(m => m.isBusy(dayIndex, shiftIndex));
    }

    /**
     * Applies the isBusyOnDay() function on provided members
     */
    public static selectedInDay(members: Member[], dayIndex: number): Member[] {
        console.assert(typeof members !== "undefined", "Members are undefined");

        return members.filter(m => m.isBusyOnDay(dayIndex));
    }

    public static selectedOnlyByCommittee(members: Member[], dayIndex: number, shiftIndex: number, commName: string): Member[] {
        console.assert(typeof members !== "undefined", "Members are undefined");
        /**
         * Filter returns an empty array when nothing is found
         */
        return members.filter(m => {
            let assignment = m.getAssignmentAt(dayIndex, shiftIndex);
            if (typeof assignment === "undefined") return false;

            return assignment.committee === commName;
        });
    }

    public static freeOnly(members: Member[], dayIndex: number, shiftIndex: number): Member[] {
        /**
         * Filter returns an empty array when nothing is found
         */
        return members.filter(m => !m.isBusy(dayIndex, shiftIndex));
    }
}
