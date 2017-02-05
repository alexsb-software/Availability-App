import { Component, Input } from '@angular/core';
import { Member } from '../../applogic-general/member';
import { SessionInfo } from '../../applogic-general/session-info';

@Component({
  selector: 'app-sessoin-member-input',
  templateUrl: './sessoin-member-input.component.html',
  styleUrls: ['./sessoin-member-input.component.css']
})
export class SessoinMemberInputComponent {

  @Input() session: SessionInfo;
  @Input() publicRelMembers:Member[];
  @Input() reportingsMembers:Member[];
  
  selectedPublicRelMember:Member;
    selectedReportingMember:Member;
  
  constructor() {
    this.session = new SessionInfo();
    this.session.name = 'session';

    this.session.startDate = new Date('3');
    this.session.endDate = new Date('2');

    let pr: Member = new Member();
    pr.name = 'Losa';
    this.session.publicRelations = pr;

    const rp: Member = new Member();
    rp.name = 'Amr';
    this.session.reporting = rp;
  }

  typeaheadOnSelect(member: Member, comm: string): void {
    if (comm === 'Reporting') {
      this.session.reporting = member;
    }

    if (comm === 'PublicRel') {
      this.session.publicRelations = member;
    }
  }
}
