import { ShortTimeDate } from './short-time-date';

export class EventShift {
    start: ShortTimeDate = new ShortTimeDate();
    end: ShortTimeDate = new ShortTimeDate();
    constructor() { }

    static validate(obj: EventShift): boolean {
        if (obj.start && obj.end)
            return true;
        return false;
    }

    // Tells whether one shift starts before the other
    static startsBefore(shift: EventShift, other: EventShift): boolean {
        return ShortTimeDate.isBigger(shift.start, other.start);
    }

    // Tells whether one shift ends before the other
    static endsBefore(shift: EventShift, other: EventShift): boolean {
        return ShortTimeDate.isBigger(shift.end, other.end);
    }

    static isValidShift(shift: EventShift): boolean {
        return ShortTimeDate.isBigger(shift.start, shift.end);
    }

    static isEqual(shift: EventShift, other: EventShift) {
        return ShortTimeDate.isEqual(shift.start, other.start) &&
            ShortTimeDate.isEqual(shift.end, other.end);
    }

    // TODO ? add whole shift comparison (a shift falls in a time before the other)
    // that will use, startsBefore and endsBefore functions

    // TODO add an areOverlapped function for two shifts
}
