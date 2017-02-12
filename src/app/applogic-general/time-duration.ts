//import { ShortTimeDate } from './short-time-date';

export abstract class TimeDuration {
    endDate: Date = new Date("1/1/2000");
    startDate: Date = new Date("1/1/2000");

    public static validate(duration: TimeDuration): boolean {

        let checkExistence: boolean = false;

        if (duration.startDate && duration.endDate) {
            checkExistence = true;
        }

        if (checkExistence) {
            return (duration.startDate < duration.endDate);
        }
        return false;
    }

    // Validates that startDate time is less than endDate time
    private static isValid(duration: TimeDuration): boolean {
        return (duration.startDate < duration.endDate);
    }

    // Tells whether one duration starts before the other
    static startsBefore(duration: TimeDuration, other: TimeDuration): boolean {
        //return ShortTimeDate.isBigger(duration.startDate, other.startDate);
        return duration.startDate > other.startDate;
    }

    // Tells whether one duration ends before the other
    static endsBefore(duration: TimeDuration, other: TimeDuration): boolean {
        //return ShortTimeDate.isBigger(duration.endDate, other.endDate);
        return duration.endDate > other.endDate;
    }

    // This might be used in searching
    static isEqual(duration: TimeDuration, other: TimeDuration) {
        return (duration.startDate.getTime() === other.startDate.getTime()) &&
            (duration.endDate.getTime() === other.endDate.getTime());
    }
}
