import { ShortTimeDate } from './short-time-date';

export abstract class TimeDuration {
    start: ShortTimeDate;
    end: ShortTimeDate;


    validate(): boolean {
        let checkExistence: boolean = false;

        if (this.start && this.end) {
            checkExistence = true;
        }

        if (checkExistence) {
            return this.isValid();
        }
        return false;
    }

    // Validates that start time is less than end time
    private isValid(): boolean {
        return ShortTimeDate.isLess(this.start, this.end);
    }

    // Tells whether one duration starts before the other
    static startsBefore(duration: TimeDuration, other: TimeDuration): boolean {
        return ShortTimeDate.isBigger(duration.start, other.start);
    }

    // Tells whether one duration ends before the other
    static endsBefore(duration: TimeDuration, other: TimeDuration): boolean {
        return ShortTimeDate.isBigger(duration.end, other.end);
    }

    // This might be used in searching
    static isEqual(duration: TimeDuration, other: TimeDuration) {
        return ShortTimeDate.isEqual(duration.start, other.start) &&
            ShortTimeDate.isEqual(duration.end, other.end);
    }
}
