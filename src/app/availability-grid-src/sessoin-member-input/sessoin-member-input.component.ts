import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Member } from '../../applogic-general/member';
import { SessionInfo } from '../../applogic-general/session-info';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

@Component({
  selector: 'app-sessoin-member-input',
  templateUrl: './sessoin-member-input.component.html',
  styleUrls: ['./sessoin-member-input.component.css']
})
export class SessoinMemberInputComponent {

  @Input() session: SessionInfo;
  @Input() publicRelMembers: Member[];
  @Input() reportingsMembers: Member[];

  // TODO create events for PR and R&P selection
  @Output() onPublicRelSelect: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() onReportingsSelect: EventEmitter<Member> = new EventEmitter<Member>();

  @Output() onPublicRelRelease: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() onReportingsRelease: EventEmitter<Member> = new EventEmitter<Member>();


  selectedPublicRelMember: Member;
  selectedReportingMember: Member;

  constructor() {

  }

  typeaheadOnSelect(e: TypeaheadMatch, comm: string): void {
    let member: Member = e.item;

    if (comm === 'Reporting') {
      this.session.reporting = member;
      this.onReportingsSelect.emit(member);
    }

    if (comm === 'PublicRel') {
      this.session.publicRelations = member;
      this.onPublicRelSelect.emit(member);
    }
  }

  // TODO check session fillings on shift save
  checkCorrectness(): boolean {
    return false;
  }

  onMemberRelease(comm: string): void {
    // TODO using hardcoded string IS UGLY!!!
    if (comm === 'Reporting') {
      this.onReportingsRelease.emit(this.session.reporting);
      this.session.reporting = null;
    }

    if (comm === 'PublicRel') {
      this.onPublicRelRelease.emit(this.session.publicRelations);
      this.session.publicRelations = null;
    }
  }

  /**
   * Test mocking
   */
  mock(): void {
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
}
