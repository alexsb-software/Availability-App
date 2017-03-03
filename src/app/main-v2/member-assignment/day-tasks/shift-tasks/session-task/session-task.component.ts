import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router, NavigationStart} from '@angular/router';

import {fallIn} from '../../../../../animation/animation';
import {Session} from '../../../../logic/session';
import {Member} from '../../../../logic/member';
import {SessionHolderService} from '../../../../app-services/session-holder.service';
import {DayInfoHolderService} from '../../../../app-services/day-info-holder.service';
import {MemberInfoHolderService} from '../../../../app-services/member-info-holder.service';

import {ArrayItemEventArgs} from '../../../../elastic-table/elastic-table.component';
import {Filters} from '../../../../logic/filters';
import {Committee, CommitteeEnum} from '../../../../logic/committee';

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
  publicRelMembers: Member[];
  reportingsMembers: Member[];

  constructor(private sessionService: SessionHolderService,
              private dayService: DayInfoHolderService,
              private router: Router,
              private memberService: MemberInfoHolderService) {
  }

  ngOnInit() {
    // check if a session wasn't saved
    // when leaving the page, or free the members of
    // the non saved sessions
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart === false) return;
      this.resetModel();
    });

    this.resetModel();

    this.memberService.memberAssignmentChanged.subscribe((mem: Member) => {

    });
  }

  addSession(): void {

    // Validate sessoin name
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

    prMember.reserve(
      this.session.dayIndex, this.session.shiftIndex,
      Committee.getCommittee(CommitteeEnum.PublicRelations));

    reportingMember.reserve(
      this.session.dayIndex, this.session.shiftIndex,
      Committee.getCommittee(CommitteeEnum.Reporting));

    // Notify other components
    this.memberService.memberAssignmentChanged.emit(prMember);
    this.memberService.memberAssignmentChanged.emit(reportingMember);


    console.debug("Session", this.session, this.sessionService);

    // Reset the state based on the last session
    this.resetModel(this.session.endDate, this.session.dayIndex, this.session.shiftIndex);
  }


  loadSession(e: ArrayItemEventArgs): void {

    // Reset the state
    this.session = new Session();
    this.session = e.object;
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

    this.unmarkMember(session.reportingMember);
    this.unmarkMember(session.publicRelationsMember);
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
    // if the reference is empty
    try {
      if (this.session.reportingMember.isEqualTo(mem)) {
        alert("this member is being re-assigned -reportings-");
        return;
      }
      console.log(this.session.reportingMember, mem);
    } catch (error) {
    }

    try {
      if (this.session.publicRelationsMember.isEqualTo(mem)) {
        alert("this member is being re-assigned -public relations-");
        return;
      }
      console.log(this.session.publicRelationsMember, mem);
    } catch (error) {
    }

    // Transform the string to the used name
    // using the enum ( for details, check committee.ts)
    if (commName === "PR") {
      this.session.publicRelationsMember = mem;
    }
    if (commName === "R&P") {
      this.session.reportingMember = mem;
    }
    console.debug("Session info", this.session);

  }

  /**
   * Called from HTML as a click handler of the remove button in
   * assigned member table in app-committee-view
   * @param mem Member from the committee component
   */
  unmarkMember(mem: Member): void {
    // TODO this might be implemented later,
    // in case someone wants to add the ability to delete the already assigned
    // session members after the session itself is saved, anyway they must keep
    // the "session" object in a valid state

    // // Don't remove a member that was assigned in a session and saved
    // if (this.memberService.isAssignedAtShiftOnly(this.session.dayIndex,
    //     this.session.shiftIndex, mem)) {
    //   alert("Member is reserved at a session at the same time, delete/modify the session");
    //   return;
    // }
    // mem.release(this.session.dayIndex, this.session.shiftIndex);
    // this.memberService.memberAssignmentChanged.emit(mem);
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
             lastSessionDayIndex: number = -1, lastSessionShiftIndex: number = -1) {

    this.session = new Session();
    this.session.startDate = lastSessionEndTime;
    this.session.endDate = lastSessionEndTime;
    this.session.dayIndex = lastSessionDayIndex;
    this.session.shiftIndex = lastSessionShiftIndex;

    this.error = 0;
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
    let shiftMembers: Member[] = Filters.byShift(this.memberService.members, this.session.dayIndex, this.session.shiftIndex);

    this.publicRelMembers = Filters.byCommittee(shiftMembers, Committee.getCommittee(CommitteeEnum.PublicRelations));
    this.reportingsMembers = Filters.byCommittee(shiftMembers, Committee.getCommittee(CommitteeEnum.Reporting));
  }

  /**
   * Populates the member tables in the HTML
   * @param commName Name of the committee
   */
  getMembersOfCommittee(commName: string): Member[] {
    let members: Member[];
    if (commName === "PR") {
      members = this.publicRelMembers;
    }
    if (commName === "R&P") {
      members = this.reportingsMembers;
    }
    return Filters.freeOnly(members, this.session.dayIndex, this.session.shiftIndex);
  }

  /**
   * Populates the reserved table of members in the HTML
   * @param commName Name of the Committee
   */
  getSelectedMembersOfCommittee(commName: string): Member[] {
    let members: Member[];

    if (commName === "PR") {
      commName = Committee.getCommittee(CommitteeEnum.PublicRelations);
      members = this.publicRelMembers;
    }
    if (commName === "R&P") {
      commName = Committee.getCommittee(CommitteeEnum.Reporting);
      members = this.reportingsMembers;
    }

    return Filters.selectedOnlyByCommittee(members, this.session.dayIndex, this.session.shiftIndex, commName);
  }
}
