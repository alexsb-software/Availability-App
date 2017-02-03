import { ShortTimeDate } from '../../applogic-general/short-time-date';

export class EventShift {
    start: ShortTimeDate = new ShortTimeDate();
    end: ShortTimeDate = new ShortTimeDate();
    constructor() { }

    static validate(shift: EventShift): boolean {
        let checkExistence: boolean = false;

        if (shift.start && shift.end) {
            checkExistence = true;
        }

        if (checkExistence) {
            return EventShift.isValidShift(shift);
        }
        return false;
    }

    // Validates that start time is less than end time
    private static isValidShift(shift: EventShift): boolean {
        return ShortTimeDate.isLess(shift.start, shift.end);
    }

    // Tells whether one shift starts before the other
    static startsBefore(shift: EventShift, other: EventShift): boolean {
        return ShortTimeDate.isBigger(shift.start, other.start);
    }

    // Tells whether one shift ends before the other
    static endsBefore(shift: EventShift, other: EventShift): boolean {
        return ShortTimeDate.isBigger(shift.end, other.end);
    }

    // This might be used in searching
    static isEqual(shift: EventShift, other: EventShift) {
        return ShortTimeDate.isEqual(shift.start, other.start) &&
            ShortTimeDate.isEqual(shift.end, other.end);
    }

    // TODO ? add whole shift comparison (a shift falls in a time before the other)
    // that will use, startsBefore and endsBefore functions

    // TODO add an areOverlapped function for two shifts
}
