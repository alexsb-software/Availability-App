import { Member } from './member';
import { SessionInfo } from './session-info';

export type MemberAssignments = Map<Member, string>;

/**
 * This class holds all the assignment data about
 * a shift
 */
export class ShiftAssignmentInfo {
    shiftIndex: number;
    committeeMembers: MemberAssignments = new Map<Member, string>();
    sessionInfo: SessionInfo[] = [];
}

export class DayAssignmentInfo {
    dayNumber: number;
    shiftInfos: ShiftAssignmentInfo[] = [];
}