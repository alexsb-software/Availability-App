import { Component, Output, Input, EventEmitter } from '@angular/core';
import { SessionInfo } from '../../applogic-general/session-info';
import { DatePipe } from '@angular/common';
import { fallIn } from '../../animation/animation';


import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';
import { EventShift } from '../../applogic-general/event-shift';
@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrls: ['./session-editor.component.css'],
  animations: [fallIn()]
})
export class SessionEditorComponent {

  // Those 2 fields are used to display the day summary
  @Output() sessionsChanged: EventEmitter<void> = new EventEmitter<void>();
  @Input() shift: EventShift;

  // This pipe is used to transform the time displays
  datePipe: DatePipe = new DatePipe("en-US");
  pipeFormat: string = 'shortTime';

  session: SessionInfo = new SessionInfo();
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
    if (!SessionInfo.validate(this.session)) {
      this.errDetails = "Session end time is less than or equal to its start time"
      this.error = 1;
      return;
    }
    // console.debug("Session added");
    // Save the end time to make setting
    // the dates of the next item easier
    const endTime = this.session.endDate;

    // Add the session to the shift
    this.shift.sessions.push(this.session);
    this.sessionsChanged.emit();

    // Reset the component's state
    this.session = new SessionInfo();
    this.session.startDate = endTime;
    this.session.endDate = endTime;
    this.error = 0;
    // ShiftIndex stays the same, to avoid setting it when adding
    // every session
  }

  onSessionRemove(sessionIdx: number): void {
    // Remove the session from this shift
    this.shift.sessions.splice(sessionIdx, 1);

    // Update the summary display with session count
    this.sessionsChanged.emit();
  }
}
