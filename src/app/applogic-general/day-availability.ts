import { EventDay } from './event-day';
import { EventShift } from './event-shift';
import { MemberAvailability } from './member-availability';

export class DayAvailability {

    /**
     * Day of the event
     */
    day: EventDay;

    /**
     * Denote the number of shifts in the day
     */
    public get shifts(): EventShift[] {
        return this.day.shifts;
    }
    public set shifts(v: EventShift[]) {
        this.day.shifts = v;
    }

    /**
     * Availability for all the shifts combined
     */
    availabilities: MemberAvailability[];
}
