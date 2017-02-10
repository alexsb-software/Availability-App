import { Component, Output, Input, DoCheck, IterableDiffers, IterableDiffer, EventEmitter } from '@angular/core';
import { SessionInfo } from '../../applogic-general/session-info';
import { DatePipe } from '@angular/common';

import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';
import { EventShift } from '../../applogic-general/event-shift';
@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrls: ['./session-editor.component.css']
})
export class SessionEditorComponent implements DoCheck {

  @Input() shifts: EventShift[];

  // Those 2 fields are used to display the day summary
  @Output() sessionsChanged: EventEmitter<number> = new EventEmitter<number>();
  daySessionCount: number = 0;

  // This pipe is used to transform the time displays
  datePipe: DatePipe = new DatePipe("en-US");
  pipeFormat: string = 'shortTime';

  shiftIndex: number = -1;
  session: SessionInfo = new SessionInfo();

  error: number = 0;
  differ: IterableDiffer;
  constructor(differs: IterableDiffers) {

    // ngOnChanges detects changes on references only
    // it doesn't check the properties,
    // the differ is used to update the summary view
    // https://juristr.com/blog/2016/04/angular2-change-detection/
    this.differ = differs.find([]).create(null);
  }

  addSession(): void {

    // Validate the existence of a parent shift
    if (this.shiftIndex === -1) {
      this.error = 3;
      return;
    }

    // Validate sessoin name
    if (this.session.name.length === 0) {
      this.error = 2;
      return;
    }

    // Validate time correctness
    if (!SessionInfo.validate(this.session)) {
      this.error = 1;
      return;
    }

    // Save the end time to make setting
    // the dates of the next item easier
    const endTime = this.session.endDate;

    // Add the session to the shift
    this.shifts[this.shiftIndex].sessions.push(this.session);
    this.daySessionCount++;
    this.sessionsChanged.emit(this.daySessionCount);

    // Reset the component's state
    this.session = new SessionInfo();
    this.session.startDate = endTime;
    this.session.endDate = endTime;
    this.error = 0;
    // ShiftIndex stays the same, to avoid setting it when adding
    // every session
  }

  onSessionRemove(shiftIdx: number, sessionIdx: number): void {
    // Remove the session from this shift
    this.shifts[shiftIdx].sessions.splice(sessionIdx, 1);

    // Update the summary display with session count
    this.daySessionCount--;
    this.sessionsChanged.emit(this.daySessionCount);
  }

  onShiftSelect(shiftIndex: number): void {
    const oldShiftIndex = this.shiftIndex;

    this.shiftIndex = shiftIndex;

    // The below code is to improve UX, it's not related
    // to application logic ( you can skip it )

    // TODO : User friendliness,
    // After selecting a shift, if it has no items, reset the date
    // else, make the start and end date => last session end date
    const tempShift = this.shifts[shiftIndex];

    // If this is the first shift to be added
    if (oldShiftIndex === -1) {
      // Do nothing if the date was already set and doesn't match
      // the default value
      if (this.session.startDate.getTime() !== new Date("0").getTime())
        return;

      if (this.session.endDate.getTime() !== new Date("0").getTime())
        return;
    }

    if (tempShift.sessions && tempShift.sessions.length > 0) {

      // If the same shift is selected, do nothing
      // because this will reset the session date if
      // the date was selected before the session shift
      // nesting this check here is to activate the else
      // statement if a shift was deleted and re added
      if (this.shiftIndex === oldShiftIndex) return;

      
      const sessLastIdx: number = tempShift.sessions.length - 1;
      const lastSession: SessionInfo = tempShift.sessions[sessLastIdx];
      // Create a copy of the object
      this.session.startDate = Object.assign(lastSession.endDate);
      this.session.endDate = Object.assign(lastSession.endDate);
    }
    else {
      // No seessions in this shifts, reset the time picker
      this.session.startDate = new Date("0");
      this.session.endDate = new Date("0");
    }
  }

  ngDoCheck() {

    // This method is called MANY MANY times
    // do the slightest work here

    // Check for shift removal here
    if (!this.differ.diff(this.shifts)) return;

    this.daySessionCount = 0;
    for (let i: number = 0; i < this.shifts.length; i++) {
      this.daySessionCount += this.shifts[i].sessions.length;
    }
    // Notify the parent of session count change (update summary)
    this.sessionsChanged.emit(this.daySessionCount);
  }
}
