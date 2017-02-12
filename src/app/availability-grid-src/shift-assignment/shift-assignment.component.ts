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
  @Input() shiftNumber: number;
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

  selectedShiftMembers: Map<Member, string>;

  /**
   * This will be fed to the lower components, elements are 
   * fetched either by enum or committee name
  **/
  committeeMembers: Map<string, Member[]>;
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
   * Adds the members available for a committee to the corresponding
   * entry in the hash map. The shift number isn't checked
   * as this is a job for a higher component
   */
  loadMemberTables(): void {
    console.debug("laod tables");
    // Reset the tables
    this.committeeMembers = new Map<string, Member[]>();

    for (let mA of this.shiftMembersAvailability) {

      if (mA.isBusy(this.shiftNumber)) {
        // Don't add a busy member
        continue;
      }
      this.updateAvailability(mA);
    }

  }

  

  /**
   * Marks the member as selected and removes
   * it from the other committees choices
   */
  onMemberSelect(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);


    // For each item in the member's available committees
    // remove it from the bound array
    // TODO improve this, it's an expensive operation with redundancy
    mem.reserve(this.shiftNumber, comm);
    this.selectedShiftMembers.set(e, comm);
    this.loadMemberTables();
  }

  onMemberRelease(e: Member): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    mem.release(this.shiftNumber);
    this.selectedShiftMembers.delete(e);
    this.loadMemberTables();
  }

  private updateAvailability(memberAv: MemberAvailability) {
    for (let c of memberAv.availabileCommittees) {
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
      memAv.shiftNumbers = [i % 3, i % 2];
      memAv.availabileCommittees =
        [Committee.getCommittee(i % Committee.commLength()), Committee.getCommittee(Committee.commLength() - i - 1)];
      this.shiftMembersAvailability.push(memAv);
    }
  }

  saveShift(): void {
    // TODO notify the parent component
    this.onShiftSave.emit(this.selectedShiftMembers);
  }
}