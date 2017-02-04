
import { EventShift } from './event-shift';
import { SessionInfo } from './session-info';
/**
 * EventDay ( modify this as appropriate, it still has no views )
 * represents a single day of the event
 */
export class EventDay {
    dayDate: Date;
    shifts: EventShift[] = [];
    sessions: SessionInfo[] = [];
}