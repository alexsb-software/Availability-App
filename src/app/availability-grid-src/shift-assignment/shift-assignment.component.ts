import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee, CommitteeEnum } from '../../applogic-general/committee';
import { CommFilterPipe, } from '../../applogic-general/member-view/comm-filter.pipe';
import { FilterAvailbleMembersPipe } from '../../applogic-general/member-view/group-by-committee.pipe';
import { SessionInfo } from '../../applogic-general/session-info';
import { EventShift } from '../../applogic-general/event-shift';
import { MapKeysPipe } from '../../applogic-general/map-keys.pipe';

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
  publicRels: Member[] = [];
  reportings: Member[] = [];

  /**
   * Passed to the upper component for committee assignments
   */
  selectedShiftMembers: Map<Member, string> = new Map<Member, string>();

  /**
   * This will be fed to the lower components, elements are 
   * fetched either by enum or committee name
  **/
  availableCommitteeMembers: Map<string, Member[]> = new Map<string, Member[]>();
  commPipe: CommFilterPipe = new CommFilterPipe();
  mapKeys: MapKeysPipe<string, Member[]> = new MapKeysPipe<string, Member[]>();
  constructor() {
  }


  ngOnChanges(e: SimpleChanges): void {
    if (e["shiftMembersAvailability"]) {
      console.debug("update shiftMembers");
      this.updateAvailabilityTable();
    }
  }

  /**
   * Marks the member as selected and removes
   * it from the other committees choices
   */
  onMemberSelect(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(

        (m: MemberAvailability) => {
          return m.member.id === e.id;
        });

    if (typeof mem.member.id === "undefined" || !mem) {
      throw new Error("Fatal error, member didn't declare an ID");
    }

    // For each item in the member's available committees
    // remove it from the bound array
    // TODO improve this, it's an expensive operation with redundancy
    mem.reserve(this.shiftIndex, comm);
    this.selectedShiftMembers.set(e, comm);
    this.notifySaveShift();  // Autosave on modification
    this.updateAvailabilityTable();
  }

  onMemberRelease(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    if (typeof mem.member.id === "undefined" || !mem) {
      throw new Error("Fatal error, member didn't declare an ID");
    }

    this.selectedShiftMembers.delete(e);
    mem.release(this.shiftIndex);
    this.notifySaveShift();  // Autosave on modification
    this.updateAvailabilityTable();
  }

  notifySaveShift(): void {
    this.onShiftSave.emit(this.selectedShiftMembers);
  }

  /**
    * Adds the members available for a committee to the corresponding
    * entry in the hash map. The shift number isn't checked
    * as this is a job for a higher component
    */
  updateAvailabilityTable(): void {
    let filterAvailable: FilterAvailbleMembersPipe = new FilterAvailbleMembersPipe();

    let reportings: string = Committee.getCommittee(CommitteeEnum.Reporting);
    let publicRel: string = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let marketing: string = Committee.getCommittee(CommitteeEnum.Marketing);
    let temp = filterAvailable.transform(this.shiftMembersAvailability, this.shiftIndex);

    console.log(temp.get("NPSS"));
    this.publicRels = temp.get(publicRel) || [];
    this.reportings = temp.get(reportings) || [];

    this.availableCommitteeMembers = temp;  // for binding state checks    
  }

  /**
   * Creates fake members for test purposes
   */
  private mockMembers(): void {
    let prString = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let reportingsString = Committee.getCommittee(CommitteeEnum.Reporting);

    for (let i: number = 0; i < 15; i++) {
      let m: Member = new Member();
      m.id = i;
      m.name = "ai" + i;
      console.assert(this.shiftMembers !== null && this.shiftMembers, "shiftMembers fail");
      this.shiftMembers.push(m);

      let memAv: MemberAvailability = new MemberAvailability();
      memAv.member = m;
      memAv.shiftIndexes = [i % 3, i % 2];
      memAv.availabileCommittees =
        [Committee.getCommittee(i % Committee.commLength()), Committee.getCommittee(Committee.commLength() - i - 1)];
      console.assert(this.shiftMembersAvailability !== null && this.shiftMembersAvailability, "shiftMembersAvailability fail");

      this.shiftMembersAvailability.push(memAv);
    }
  }

}