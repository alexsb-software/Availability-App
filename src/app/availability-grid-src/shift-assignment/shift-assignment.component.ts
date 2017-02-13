import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee, CommiteeEnum } from '../../applogic-general/committee';
import { CommFilterPipe } from '../../applogic-general/member-view/comm-filter.pipe';
import { SessionInfo } from '../../applogic-general/session-info';
import { EventShift } from '../../applogic-general/event-shift';


@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: ['./shift-assignment.component.css']
})
/**
 * This component holds al lthe committees components,
 * It'll receive the data from the API and put it into 
 * the shiftMembersAvailability array
 */
export class ShiftAssignmentComponent implements OnChanges {
  // TODO use a hashtable instead of a linear array
  // memberTable: Map<number, Member>;  
  @Input() shiftIndex: number;
  /**
   * Used to determine the sessoins of this shift
   * to assign PR and reportings members
   */
  @Input() shift: EventShift;
  /**
   * Availablility of all members who have filled
   * the online form
   */
  @Input() shiftMembersAvailability: MemberAvailability[] = [];
  /**
   * Contains the marked as selected members,
   * this array will be used to generate the 
   * availability table.
   * 
   * It's not marked as input to avoid making
   * the code more complex when creating the upper
   * components
   */
  @Output() onShiftSave: EventEmitter<Map<Member, string>> = new EventEmitter<Map<Member, string>>();

  committees: string[] = Committee.getAll();

  // This is used to display the table contining all members in this shift  
  shiftMembers: Member[] = [];

  /**
   * Used by sessions
   */
  publicRels: Member[];
  reportings: Member[];

  /**
   * Passed to the upper component for committee assignments
   */
  selectedShiftMembers: Map<Member, string> = new Map<Member, string>();

  /**
   * This will be fed to the lower components, elements are 
   * fetched either by enum or committee name
  **/
  committeeMembers: Map<string, Member[]> = new Map<string, Member[]>();
  commPipe: CommFilterPipe = new CommFilterPipe();

  constructor() {
    //this.mockMembers();
    //this.loadMemberTables();
  }


  ngOnChanges(e: SimpleChanges): void {
    /**
     * This function is intended to run only once when the 
     * applicants are retrieved from database, changing 
     * the data that came from the 
     * database ( which will trigger ngOnChanges )
     * leaves the component in an undefined state
     */
    this.loadMemberTables();
  }



  /**
   * Marks the member as selected and removes
   * it from the other committees choices
   */
  onMemberSelect(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    if (!mem) {
      throw new Error("Fatal error, selected member is not found");
    }

    // For each item in the member's available committees
    // remove it from the bound array
    // TODO improve this, it's an expensive operation with redundancy

    mem.reserve(this.shiftIndex, comm);
    this.selectedShiftMembers.set(e, comm);
    this.loadMemberTables();
    this.notifySaveShift();  // Autosave on modification
  }

  onMemberRelease(e: Member): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    mem.release(this.shiftIndex);
    this.selectedShiftMembers.set(e);
    this.notifySaveShift();  // Autosave on modification
    this.loadMemberTables();
  }

  /**
    * Adds the members available for a committee to the corresponding
    * entry in the hash map. The shift number isn't checked
    * as this is a job for a higher component
    */
  loadMemberTables(): void {
    // Reset the tables
    this.committeeMembers = new Map<string, Member[]>();
    this.publicRels = [];
    this.reportings = [];

    for (let mA of this.shiftMembersAvailability) {

      if (mA.isBusy(this.shiftIndex)) {
        // Don't add a busy member
        console.log("Busy member");
        console.log(mA);
        continue;
      }
      this.updateAvailability(mA);
    }

  }

  getAvailableCommitteess(): string[] {
    // TODO this REALLY wants to change
    let comms: Set<string> = new Set<string>();

    this.shiftMembersAvailability.forEach(av => {
      av.availabileCommittees.forEach(c => comms.add(c));
    });

    let retArr: string[] = [];
    comms.forEach(entry => retArr.push(entry));

    return retArr;
  }

  private updateAvailability(memberAv: MemberAvailability) {


    for (let c of memberAv.availabileCommittees) {
      let isPublicRelOrReportings: boolean = false;

      if (c === Committee.getCommittee(CommiteeEnum.PublicRelations)) {
        this.publicRels.push(memberAv.member);
        isPublicRelOrReportings = true;
      }

      if (c === Committee.getCommittee(CommiteeEnum.Reportings)) {
        this.reportings.push(memberAv.member);
        isPublicRelOrReportings = true;
      }

      // Don't add PR and RP memebers to shift availability
      if (isPublicRelOrReportings) {
        /**
         * If a member is available in PR or R&P they will 
         * be added to the session members, if they are also
         * in say Activities, they'll be added to shift members
         */
        continue;
      }

      // Add empty entries
      if (!this.committeeMembers.has(c)) {
        this.committeeMembers.set(c, []);
      }

      let oldVals = this.committeeMembers.get(c);

      oldVals.push(memberAv.member)
      this.committeeMembers.set(c, oldVals);
    }
  }

  /**
   * Creates fake members for test purposes
   */
  private mockMembers(): void {
    let prString = Committee.getCommittee(CommiteeEnum.PublicRelations);
    let reportingsString = Committee.getCommittee(CommiteeEnum.Reportings);

    for (let i: number = 0; i < 15; i++) {
      let m: Member = new Member();
      m.id = i;
      m.name = "ai" + i;
      this.shiftMembers.push(m);

      let memAv: MemberAvailability = new MemberAvailability();
      memAv.member = m;
      memAv.shiftIndexes = [i % 3, i % 2];
      memAv.availabileCommittees =
        [Committee.getCommittee(i % Committee.commLength()), Committee.getCommittee(Committee.commLength() - i - 1)];
      this.shiftMembersAvailability.push(memAv);
    }
  }

  notifySaveShift(): void {
    this.onShiftSave.emit(this.selectedShiftMembers);
  }
}