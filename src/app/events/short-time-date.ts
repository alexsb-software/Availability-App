import { TimeOfDay } from './time-of-day.enum';
export class ShortTimeDate {

    // Those values are used in display of "input" elements
    hours: number = 1;
    minutes: number = 0;
    isPm: boolean = false;

    public static toString(val: ShortTimeDate): string {
        let result = String(val.hours) +
            ":" + ShortTimeDate.stringifyNumber(val.minutes) + " "
            + (val.isPm ? "AM" : "PM");
        return result;
    }

    private static stringifyNumber(val: number): string {
        return val < 10 ? String("0" + val) : String(val);
    }

    // Comparison functions

    public static isBigger(val: ShortTimeDate, other: ShortTimeDate) {
        return ShortTimeDate.toNumber(val) > ShortTimeDate.toNumber(other)
    }

    public static isEqual(val: ShortTimeDate, other: ShortTimeDate) {
        return ShortTimeDate.toNumber(val) === ShortTimeDate.toNumber(other)
    }

    public static isLess(val: ShortTimeDate, other: ShortTimeDate) {
        return ShortTimeDate.toNumber(val) < ShortTimeDate.toNumber(other)
    }

    public static isLessOrEqual(val: ShortTimeDate, other: ShortTimeDate) {
        return ShortTimeDate.toNumber(val) <= ShortTimeDate.toNumber(other)
    }

    public static isBiggerOrEqual(val: ShortTimeDate, other: ShortTimeDate) {
        return ShortTimeDate.toNumber(val) >= ShortTimeDate.toNumber(other)
    }

    private static toNumber(val: ShortTimeDate): number {
        // Considering that a day starts at 12.00 am
        // a time at PM will have the its value
        // added to 12 hrs, then the function
        // converts the timevalue to minutes and
        // compare

        let toMinutes: number = 60;
        let v1Value: number = val.minutes +
            (val.hours * toMinutes);

        if (val.isPm) v1Value += 12 * toMinutes;
        
        return v1Value;
    }
}
