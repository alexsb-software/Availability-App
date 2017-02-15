import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee, CommitteeEnum } from '../../applogic-general/committee';
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
   * This array holds the committes registered in the form.
   * It's calculated once from members availability
   */
  @Input() inputCommittees: string[] = [];
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
    console.debug("ShiftAssignmentComponent change #" + this.shift.number);
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
    this.notifySaveShift();  // Autosave on modification
    this.loadMemberTables();
    // let oldMembers: Member[] = this.committeeMembers.get(comm);
    // let removedMemberIdx: number = oldMembers.findIndex(m => m.id === e.id);
    // if (!removedMemberIdx) throw new Error("Fatal, can't find deleted member");
    // oldMembers.splice(removedMemberIdx, 1);
    // this.committeeMembers.set(comm, oldMembers);
  }

  onMemberRelease(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    this.selectedShiftMembers.delete(e);
    mem.release(this.shiftIndex);
    this.notifySaveShift();  // Autosave on modification
    this.loadMemberTables();
    // let oldMembers: Member[] = this.committeeMembers.get(comm);
    // let removedMemberIdx: number = oldMembers.findIndex(m => m.id === e.id);
    // if (!removedMemberIdx) throw new Error("Fatal, can't find deleted member");
    // oldMembers.splice(removedMemberIdx, 1);
    // this.committeeMembers.set(comm, oldMembers);
  }

  notifySaveShift(): void {

    this.onShiftSave.emit(this.selectedShiftMembers);
  }

  /**
    * Adds the members available for a committee to the corresponding
    * entry in the hash map. The shift number isn't checked
    * as this is a job for a higher component
    */
  loadMemberTables(): void {
    /**
     * This loop is very ugly, but it's needed as angular binding doesn't
     * notice changes on add/delete
     * 
     * ngDoCheck should be used with iterable differ?
     */
    // Reset the tables
    this.committeeMembers = new Map<string, Member[]>();
    this.publicRels = [];
    this.reportings = [];

    let logistics: string = Committee.getCommittee(CommitteeEnum.Logistics);
    let publicRel: string = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let reportings: string = Committee.getCommittee(CommitteeEnum.Reportings);

    // Don't add availability slots for PR and R&P
    // Add empty entries for other committees
    for (let com of this.committees) {
      if (com === publicRel || com === reportings) continue;
      this.committeeMembers.set(com, []);
    }

    for (let mA of this.shiftMembersAvailability) {

      if (mA.isBusy(this.shiftIndex)) {
        // Don't add a busy member
        //console.log("Busy member");
        //console.log(mA);
        continue;
      }



      // TODO: if a member exists in PR and another committee they won't
      // appear in logistics slot
      // Prevent adding a member twice by other committee availablities
      if (mA.availabileCommittees.indexOf(publicRel) === -1
        && mA.availabileCommittees.indexOf(reportings) === -1) {
        // Make all members available for logistics

        console.log("Not PR not R&P");

        if (!this.committeeMembers.has(logistics)) {
          this.committeeMembers.set(logistics, []);
        }
        // Add all available members to logistics
        let oldLogistics = this.committeeMembers.get(logistics);
        console.assert(oldLogistics !== null && oldLogistics, "old logistics fail");
        oldLogistics.push(mA.member);
        this.committeeMembers.set(logistics, oldLogistics);

      }

      this.updateAvailability(mA);
    }

  }


  private updateAvailability(memberAv: MemberAvailability) {

    // String to hold the name of the committee
    let publicRel: string = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let reportings: string = Committee.getCommittee(CommitteeEnum.Reportings);


    for (let c of memberAv.availabileCommittees) {
      let isPublicRelOrReportings: boolean = false;


      if (c === publicRel) {
        console.assert(this.publicRels !== null, "Public Relations fail");
        this.publicRels.push(memberAv.member);
        isPublicRelOrReportings = true;
      }

      if (c === reportings) {
        console.assert(this.publicRels !== null, "Reportings fail");
        this.reportings.push(memberAv.member);
        isPublicRelOrReportings = true;
      }



      //Don't add PR and RP memebers to shift availability
      if (isPublicRelOrReportings) {
        /**
         * If a member is available in PR or R&P they will 
         * be added to the session members, if they are also
         * in say Activities, they'll be added to shift members
         */
        continue;
      }



      let oldVals = this.committeeMembers.get(c);
      if (!oldVals) {
        oldVals = []; // Populate unknown committees members
      }
      console.assert(oldVals !== null && oldVals, "oldVals fail");
      oldVals.push(memberAv.member)
      this.committeeMembers.set(c, oldVals);
    }
  }

  /**
   * Creates fake members for test purposes
   */
  private mockMembers(): void {
    let prString = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let reportingsString = Committee.getCommittee(CommitteeEnum.Reportings);

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