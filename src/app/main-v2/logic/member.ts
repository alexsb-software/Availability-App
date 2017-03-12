import { ShiftAssignmentInfo } from './shift-assignment-info';

type DayIndex = number;
type ShiftIndex = number[];
type Committee = string;

export class Member {
  committees: Committee[];
  name: string;

  // 2D array of shifts, each sub array represents
  // the shifts available for the corresponding day
  shifts: ShiftIndex[] = [];

  // This field is set arbitrrarily, it's used locally
  // by the application logic to find the selected memebrs
  id: number;

  private assigned: ShiftAssignmentInfo[] = [];

  // IDs won't come from a databse. set them
  private static maxId = 0;

  constructor() {
    this.id = Member.maxId++;
  }

  /**
   * Marks the member as taken in the given shift number
   * by the given committee
   */
  public reserve(dayIdx: number, shiftIdx: number, comm: string) {

    let info: ShiftAssignmentInfo = new ShiftAssignmentInfo();
    info.committee = comm;
    info.dayIndex = dayIdx;
    info.shiftIndex = shiftIdx;

    this.assigned.push(info);
  }

  /**
   * Releases the member from the given shift number
   */
  public release(dayIdx: number, shiftIndex: number): void {
    let result: FindResult = this.findAssignmentIndex(dayIdx, shiftIndex);

    if (!result.found) throw new Error("Requested member not found");

    this.assigned.splice(result.index, 1);
  }

  /**
   * Checks whther a member is busy in
   * EITHER shift OR a session
   */
  public isBusy(dayIdx: number, shiftIdx: number): boolean {
    return this.getAssignment(dayIdx, shiftIdx).found;
  }

  public isBusyOnDay(dayIdx: number): boolean {
    return this.findDayAssignmentIndex(dayIdx).found;
  }

  public getAssignmentAt(dayIdx: number, shiftIdx: number): ShiftAssignmentInfo {
    let assignment: ShiftAssignmentInfo = this.assigned[this.getAssignment(dayIdx, shiftIdx).index];
    return assignment;
  }

  private getAssignment(dayIdx: number, shiftIdx: number): FindResult {
    return this.findAssignmentIndex(dayIdx, shiftIdx);
  }

  private findAssignmentIndex(dayIdx: number, shiftIndex: number): FindResult {

    let idx: number = this.assigned
      .findIndex(sh => sh.dayIndex === dayIdx
        && sh.shiftIndex === shiftIndex);
    if (idx === -1) {
      return FindResult.createNotFound();
    }
    return FindResult.createFound(idx);
  }

  private findDayAssignmentIndex(dayIdx: number): FindResult {

    let idx: number =
      this.assigned.findIndex(sh =>
        sh.dayIndex === dayIdx);

    if (idx === -1) {
      return FindResult.createNotFound();
    }
    return FindResult.createFound(idx);
  }

  /**
   * Gets the committee owning the member at the given
   * shift number
   */
  public getOwningCommittee(dayIdx: number, shiftIdx: number): string {
    let result = this.findAssignmentIndex(dayIdx, shiftIdx);

    if (!result.found) throw new Error("Requested member's committee not found");

    return this.assigned[result.index].committee;
  }

  public isEqualTo(other: Member): boolean {
    try {
      return this.id === other.id;
    }
    catch (e) {
      return false;
    }
  }
}
class FindResult {
  found: boolean;
  index: number;

  static createFound(index: number): FindResult {
    let result = new FindResult();
    result.found = true;
    result.index = index;

    return result;
  }

  static createNotFound(): FindResult {
    let result = new FindResult();
    result.found = false;

    return result;
  }
}
