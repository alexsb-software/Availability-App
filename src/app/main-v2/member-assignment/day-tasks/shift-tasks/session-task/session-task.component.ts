import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { fallIn } from '../../../../../animation/animation';
import { Session } from '../../../../logic/session';
import { Member } from '../../../../logic/member';
import { SessionHolderService } from '../../../../app-services/session-holder.service';
import { DayInfoHolderService } from '../../../../app-services/day-info-holder.service';
import { MemberInfoHolderService } from '../../../../app-services/member-info-holder.service';

import { Filters } from '../../../../logic/filters';
import { Committee, CommitteeEnum } from '../../../../logic/committee';

@Component({
  selector: 'app-session-task',
  templateUrl: './session-task.component.html',
  styles: []
})
export class SessionTaskComponent implements OnInit {

  /**
   * Used for the Dynamic Table component
   * in the template
   */
  pipe: DatePipe = new DatePipe("en-US");

  session: Session = new Session();
  error: number = 0;
  errDetails: String;
  publicRelMembers: Member[];
  reportingsMembers: Member[];

  constructor(private sessionService: SessionHolderService,
    private dayService: DayInfoHolderService,
    private memberService: MemberInfoHolderService) { }

  ngOnInit() {
    // >> Test data
    this.session.startDate = new Date("1/1/2000");
    this.session.endDate = new Date("1/1/2000");
    this.session.name = "hamada";
    let m: Member = new Member();
    m.name = "mido1";
    this.session.publicRelationsMember = m;
    this.session.reportingMember = m;
    this.sessionService.sessions.push(this.session);
    // << Test data

    this.session = new Session();
    this.session.startDate = new Date("1/1/2000");
    this.session.endDate = new Date("1/1/2000");
    this.session.shiftIndex = -1;
    this.session.dayIndex = -1;
  }

  addSession(): void {

    // Validate sessoin name
    if (this.session.name.length === 0) {
      this.errDetails = "Session name is required"
      this.error = 2;
      return;
    }

    // Validate time correctness
    if (!Session.validate(this.session)) {
      this.errDetails = "Session end time is less than or equal to its start time"
      this.error = 1;
      return;
    }
    // console.debug("Session added");
    // Save the end time to make setting
    // the dates of the next item easier
    const endTime = this.session.endDate;

    // Add the session to the shift
    this.sessionService.sessions.push(this.session);
    this.sessionService.sessionsChanged.emit();

    console.debug("Session", this.session, this.sessionService.sessions);


    // ShiftIndex stays the same, to avoid setting it when adding
    // every session
  }

  onSessionRemove(sessionIdx: number): void {
    // Remove the session from this shift
    this.sessionService.sessions.splice(sessionIdx, 1);

    // Update the summary display with session count
    this.sessionService.sessionsChanged.emit();
  }

  upDownChange(what: string, amount: number) {
    if (what === "day") {
      let dayCount: number = this.dayService.dayShifts.length;

      // Don't set an invalid day count
      if (this.session.dayIndex + amount > (dayCount - 1) || this.session.dayIndex + amount < 0)
        return;

      // Add the amount to the current value
      this.session.dayIndex += amount;

      // Initial state
      if (this.session.dayIndex === 0) {
        this.session.shiftIndex = 0;
      }
    }
    else if (what === "shift") {

    }

    // Load public relations and R&P members
    let shiftMembers: Member[] = Filters.byShift(this.memberService.members, this.session.dayIndex, this.session.shiftIndex);

    this.publicRelMembers = Filters.byCommittee(shiftMembers, Committee.getCommittee(CommitteeEnum.PublicRelations));
    this.reportingsMembers = Filters.byCommittee(shiftMembers, Committee.getCommittee(CommitteeEnum.Reporting));
  }

  getMembersOfCommittee(commName: string): Member[] {
    let members: Member[] = [];
    if (commName === "PR") {
      members = this.publicRelMembers;
    }
    if (commName === "R&P") {
      members = this.reportingsMembers;
    }

    let commMembers: Member[] = Filters.byCommittee(members, commName);
    return Filters.freeOnly(commMembers, this.session.dayIndex, this.session.shiftIndex);
  }

  getSelectedMembersOfCommittee(commName: string): Member[] {
    //let commMembers: Member[] = Filters.byCommittee(members, commName);
    //return Filters.selectedOnlyByCommittee(commMembers, this.session.dayIndex, this.session.shiftIndex, commName);
    return [];
  }

  select(e): void {

  }

  deselect(e): void {

  }


  resetModel(lastSessionEndTime: Date = new Date("1/1/2000"),
    lastSessionDayIndex: number = -1, lastSessionShiftIndex: number = -1) {

    this.session = new Session();
    this.session.startDate = lastSessionEndTime;
    this.session.endDate = lastSessionEndTime;
    this.session.dayIndex = lastSessionDayIndex;
    this.session.shiftIndex = lastSessionShiftIndex;

    this.error = 0;
  }

}
