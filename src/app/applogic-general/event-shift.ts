//import { ShortTimeDate } from '../../applogic-general/short-time-date';
import { TimeDuration } from './time-duration';
import { SessionInfo } from './session-info';

/**
 * TODO track the number of shifts.
 */
export class EventShift extends TimeDuration {
    number: number = NaN;
    sessions: SessionInfo[] = [];
}
