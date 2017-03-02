import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { fallIn } from '../../../../../animation/animation';
import { Session } from '../../../../logic/session';
@Component({
  selector: 'app-session-task',
  templateUrl: './session-task.component.html',
  styles: []
})
export class SessionTaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Those 2 fields are used to display the day summary
  @Output() sessionsChanged: EventEmitter<void> = new EventEmitter<void>();

  sessions: Session[] = [];
  session: Session = new Session();
  error: number = 0;
  errDetails: String;

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
    this.sessions.push(this.session);
    this.sessionsChanged.emit();

    // Reset the component's state
    this.session = new Session();
    this.session.startDate = endTime;
    this.session.endDate = endTime;
    this.error = 0;
    // ShiftIndex stays the same, to avoid setting it when adding
    // every session
  }

  onSessionRemove(sessionIdx: number): void {
    // Remove the session from this shift
    this.sessions.splice(sessionIdx, 1);

    // Update the summary display with session count
    this.sessionsChanged.emit();
  }

}
