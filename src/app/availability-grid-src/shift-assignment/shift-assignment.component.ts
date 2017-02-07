import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee } from '../../applogic-general/committee';
import { CommFilterPipe } from '../../applogic-general/member-view/comm-filter.pipe';

@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: ['./shift-assignment.component.css']
})
export class ShiftAssignmentComponent implements OnChanges {
  // TODO use a hashtable instead of a linear array
  // memberTable: Map<number, Member>;  
  @Input() shiftNumber: number;
  @Input() shiftMembersAvailability: MemberAvailability[] = [];
  @Input() selectedShiftMembers: MemberAvailability[];

  committees: string[] = Committee.getAll();
  shiftMembers: Member[] = [];
  publicRelationMembers: Member[] = [];
  reportingsMembers: Member[] = [];

  commPipe: CommFilterPipe = new CommFilterPipe();

  ngOnChanges(e: SimpleChanges): void {
    this.shiftMembers = [];
    this.shiftMembersAvailability.forEach(mA => {
      this.shiftMembers.push(mA.member);
    });

    // TODO NOT FINISHED
    this.pub
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
