import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { fallIn } from '../../../../../animation/animation';
import { Session } from '../../../../logic/session';
import { Member } from '../../../../logic/member';
import { SessionHolderService } from '../../../../app-services/session-holder.service';
import { DayInfoHolderService } from '../../../../app-services/day-info-holder.service';
import { MemberInfoHolderService } from '../../../../app-services/member-info-holder.service';

import { ArrayItemEventArgs } from '../../../../elastic-table/elastic-table.component';
import { FilterService } from '../../../../app-services/filter.service';
import { CommitteeService, CommitteeEnum } from '../../../../app-services/committee.service';
import { tryCatch } from "rxjs/util/tryCatch";

@Component({
  selector: 'app-session-task',
  templateUrl: './session-task.component.html'
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

  availablePublicRelMembers: Member[] = [];
  availableReportingMembers: Member[] = [];

  busyPublicRelMembers: Member[] = [];
  busyReportingMembers: Member[] = [];

  constructor(private sessionService: SessionHolderService,
    private dayService: DayInfoHolderService,
    private router: Router,
    private committeeServiceCommittee: CommitteeService,
    private filterService: FilterService,
    private memberService: MemberInfoHolderService) {
  }

  ngOnInit() {
    // check if a session wasn't saved
    // when leaving the page, or free the members of
    // the non saved sessions

    this.router.events.subscribe(e => {

      if (e instanceof NavigationEnd) {
        this.resetModel();
        this.updateMemberLists(this.session.dayIndex, this.session.shiftIndex);
      }

    });

    this.memberService.memberAssignmentChanged.subscribe(() => {
      this.updateMemberLists(this.session.dayIndex, this.session.shiftIndex);
    });

    this.resetModel();
    this.updateMemberLists(this.session.dayIndex, this.session.shiftIndex);
  }

  addSession(): void {

    // Validate session name
    if (!this.session.name || this.session.name.length === 0) {
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

    // Add the session to the shift

    this.sessionService.addSession(this.session);
    this.sessionService.sessionsChanged.emit(this.session);


    // Save the member assignment

    let prMember = this.session.publicRelationsMember;
    let reportingMember = this.session.reportingMember;
    let sessionDayIndex = this.session.dayIndex;
    let sessionShiftIndex = this.session.shiftIndex;

    // TODO check if prMember and reportingMember are not selected

    prMember.reserve(
      sessionDayIndex, sessionShiftIndex,
      this.committeeServiceCommittee.getCommittee(CommitteeEnum.PublicRelations));

    reportingMember.reserve(
      sessionDayIndex, sessionShiftIndex,
      this.committeeServiceCommittee.getCommittee(CommitteeEnum.Reporting));

    // Notify other components and update member lists in this component
    this.memberService.memberAssignmentChanged.emit(prMember);
    this.memberService.memberAssignmentChanged.emit(reportingMember);

    // Reset the state based on the last session
    this.resetModel(this.session.endDate, sessionShiftIndex, this.session.shiftIndex);
    // this.updateMemberLists(sessionDayIndex, sessionShiftIndex);  // Check
  }

  deleteSession(e: ArrayItemEventArgs): void {

    let session: Session = e.object;

    // Remove the session from this shift
    this.sessionService.removeSession(session);

    // Update the summary display with session count
    this.sessionService.sessionsChanged.emit(session);

    // The session can't be in the table unless
    // it has PR and R&P members set.
    // The release function is originally waiting an
    // object from the table

    this.unmarkMember('R&P', session.reportingMember);
    this.unmarkMember('PR', session.publicRelationsMember);
  }

  /**
   * Marks a member to be taken when the session is saved
   * just loads the member name to the view
   *
   * @param commName Committe of the marked member
   * @param mem Member to be marked
   */
  markMember(commName: string, mem: Member): void {

    // The member may be in both R&P and PR, don't select them
    // twice

    // If the object is undefined, do nothing
    // The object type is always undefined, I can't Test
    // if the reference is empty so a try-catch statement is used
    try {
      if (this.session.reportingMember.isEqualTo(mem)) {
        alert("this member is being re-assigned -reporting-");
        return;
      }
    } catch (error) {
    }

    try {
      if (this.session.publicRelationsMember.isEqualTo(mem)) {
        alert("this member is being re-assigned -public relations-");
        return;
      }
    } catch (error) {
    }

    // Transform the string to the used name
    // using the enum ( for details, check committee.ts)
    if (commName === "PR") {
      this.session.publicRelationsMember = mem;
    }
    else if (commName === "R&P") {
      this.session.reportingMember = mem;
    }
  }

  /**
   * Resets the component session to be filled, if the last session
   * was saved, the new session will start at its end
   *
   * @param lastSessionEndTime End time of last session
   * @param lastSessionDayIndex Index of last session's day
   * @param lastSessionShiftIndex Index of last session's shift
   */
  resetModel(lastSessionEndTime: Date = new Date("1/1/2000"),
    lastSessionDayIndex: number = 0, lastSessionShiftIndex: number = 0) {

    this.session = new Session();
    this.session.startDate = lastSessionEndTime;
    this.session.endDate = lastSessionEndTime;
    this.session.dayIndex = lastSessionDayIndex;
    this.session.shiftIndex = lastSessionShiftIndex;

    this.error = 0;
  }

  /**
   * Updates the lists containing members
   */
  updateMemberLists(dayIndex: number, shiftIndex: number): void {
    this.updateBusyMembersList(dayIndex, shiftIndex);
    this.updateFreeMembersList(dayIndex, shiftIndex);
  }

  updateBusyMembersList(dayIndex: number, shiftIndex: number): void {

    let shiftMembers: Member[] = this.filterService.byShift(this.memberService.members,
      dayIndex, shiftIndex);
    let prComm: string = this.committeeServiceCommittee.getCommittee(CommitteeEnum.PublicRelations);
    let reportingComm: string = this.committeeServiceCommittee.getCommittee(CommitteeEnum.Reporting);

    this.busyPublicRelMembers =
      this.filterService.selectedOnlyByCommittee(shiftMembers,
        dayIndex, shiftIndex, prComm);

    this.busyReportingMembers =
      this.filterService.selectedOnlyByCommittee(shiftMembers,
        dayIndex, shiftIndex, reportingComm);
  }

  updateFreeMembersList(dayIndex: number, shiftIndex: number): void {
    let shiftMembers: Member[] =
      this.filterService.byShift(this.memberService.members,
        dayIndex, shiftIndex);

    let prComm: string = this.committeeServiceCommittee.getCommittee(CommitteeEnum.PublicRelations);
    let reportingComm: string = this.committeeServiceCommittee.getCommittee(CommitteeEnum.Reporting);

    let freeShiftMembers: Member[] =
      this.filterService.freeOnly(shiftMembers, dayIndex, shiftIndex);

    this.availablePublicRelMembers =
      this.filterService.byCommittee(freeShiftMembers, prComm);

    this.availableReportingMembers =
      this.filterService.byCommittee(freeShiftMembers, reportingComm);
  }

  /**
   * Used to update the HTML view when the shift/day index changes
   * @param what Day/Shift change
   * @param amount +1 / -1
   */
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
      let shiftCount = this.dayService.dayShifts[this.session.dayIndex];

      // Don't set an invalid day count
      if (this.session.shiftIndex + amount > (shiftCount - 1) || this.session.shiftIndex + amount < 0)
        return;

      // Add the amount to the current value
      this.session.shiftIndex += amount;
    }

    // Load public relations and R&P members
    let shiftMembers: Member[] = this.filterService.byShift(this.memberService.members, this.session.dayIndex, this.session.shiftIndex);

    // Clear the members of the session being edited
    this.session.publicRelationsMember = null;
    this.session.reportingMember = null;

    this.availablePublicRelMembers = this.filterService.byCommittee(shiftMembers, this.committeeServiceCommittee.getCommittee(CommitteeEnum.PublicRelations));
    this.availableReportingMembers = this.filterService.byCommittee(shiftMembers, this.committeeServiceCommittee.getCommittee(CommitteeEnum.Reporting));
  }

  /**
   * Called from HTML as a click handler of the remove button in
   * assigned member table in app-committee-view, removes
   * the member from the currently edited session
   * and when deleting a session
   *
   * @param comm Name of committee
   * @param mem Member from the committee component
   */
  unmarkMember(comm: string, mem: Member): void {

    // Attempt to remove the member from the session currently
    // being edited, try/catch is used as I can't know if the
    // reference is holding an object or not

    if (comm === 'PR') {
      try {
        if (mem.isEqualTo(this.session.publicRelationsMember)) {
          this.session.publicRelationsMember = null;
        }
      } catch (e) {
      }
    }

    if (comm === 'R&P') {
      try {
        if (mem.isEqualTo(this.session.reportingMember)) {
          this.session.reportingMember = null;
        }
      } catch (e) {
      }
    }

    // Remove the member assigned by a session that will be deleted
    // Don't remove a member that was assigned in a previously saved session
    if (this.memberService.isAssignedAtShiftOnly(this.session.dayIndex,
      this.session.shiftIndex, mem)) {
      alert("Member is reserved at a shift, modify shift assignment");
      return;
    }
    mem.release(this.session.dayIndex, this.session.shiftIndex);
    this.memberService.memberAssignmentChanged.emit(mem);
  }

}
