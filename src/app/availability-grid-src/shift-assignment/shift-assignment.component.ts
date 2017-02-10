import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee } from '../../applogic-general/committee';
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
   * Availablility of all members who have filled
   * the online form
   */
  @Input() shiftMembersAvailability: MemberAvailability[] = [];
  /**
   * Contains the marked as selected members,
   * this array will be used to generate the 
   * availability table.
   */
  @Input() selectedShiftMembers: MemberAvailability[];
  /**
   * Event day that this object is holding
   */
  @Input() shift: EventShift;

  committees: string[] = Committee.getAll();
  shiftMembers: Member[] = [];
  publicRelationMembers: Member[] = [];
  reportingsMembers: Member[] = [];

  commPipe: CommFilterPipe = new CommFilterPipe();

  ngOnChanges(e: SimpleChanges): void {

    // Get the names of the commitees from the array
    let prCommName: string = Committee.getCommittee("public");
    let reportingCommName: string = Committee.getCommittee("reporting");

    this.shiftMembers = [];

    this.shiftMembersAvailability.forEach(mA => {
      if (mA.isBusy()) return;

      this.shiftMembers.push(mA.member);

      /**
       * This array will be displayed for the sesions
       * component to assign the reportings and public 
       * relations members
       */
      if (mA.availabileCommittees.indexOf(prCommName) != -1) {
        this.publicRelationMembers.push(mA.member);
      }
      if (mA.availabileCommittees.indexOf(reportingCommName) != -1) {
        this.reportingsMembers.push(mA.member);
      }

    });

  }

  constructor() {
    for (let i: number = 0; i < 5; i++) {
      let m: Member = new Member();
      m.id = i;
      m.name = "ai" + i;
      this.shiftMembers.push(m);

      let memAv: MemberAvailability = new MemberAvailability();
      memAv.member = m;
      memAv.shiftNumber = i % 3;
      memAv.availabileCommittees = [Committee.getCommittee(i % Committee.commLength())];
      this.shiftMembersAvailability.push(memAv);
    }
  }

  onMemberSelect(e: Member, comm: string): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    mem.reserve(comm);
    console.log(this.shiftMembersAvailability);
  }

  onMemberRelease(e: Member): void {
    let mem: MemberAvailability =
      this.shiftMembersAvailability.find(
        (m: MemberAvailability) => m.member.id === e.id);

    mem.release();
    console.log(this.shiftMembersAvailability);
  }
}
