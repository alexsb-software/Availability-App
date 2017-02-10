
import { EventShift } from './event-shift';
import { SessionInfo } from './session-info';
/**
 * EventDay ( modify this as appropriate, it still has no views )
 * represents a single day of the event
 */
export class EventDay {
    dayDate: Date;
    shifts: EventShift[] = [];

    // Add method, getSessionCount()
    getSessionCount(): number {
        let count: number = 0;
        this.shifts.forEach(s => count += s.sessions.length);
        return count;
    }

}