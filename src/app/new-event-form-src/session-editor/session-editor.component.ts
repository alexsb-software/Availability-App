import { Component, Input, OnChanges } from '@angular/core';
import { SessionInfo } from '../../applogic-general/session-info';
import { DatePipe } from '@angular/common';

import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';
import { EventShift } from '../../applogic-general/event-shift';
@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrls: ['./session-editor.component.css']
})
export class SessionEditorComponent {

  @Input() sessions: SessionInfo[];
  @Input() shifts: EventShift[];
  // Move this to event creation
  startDate: Date = new Date("0");
  endDate: Date = new Date("0");
  pipe: DatePipe = new DatePipe("en-US");
  pipeFormat: string = 'shortTime';

  session: SessionInfo = new SessionInfo();
  error: number = 0;

  addSession(): void {

    if (!SessionInfo.validate(this.session)) {
      // Add error message
      if (isNaN(this.session.getShift().number)) {
        console.log("error is nana");
        this.error = 3;
      }
      else {
        this.error = 1;
      }
      console.debug("session validate");
      console.log(this.session);

      return;
    }
    if (this.session.name.length === 0) {
      // Add error message
      this.error = 2;
      return;
    }

    const endTime = this.session.endDate;

    // Save object
    this.sessions.push(this.session);
    this.session = new SessionInfo();

    // Reset state
    this.session.startDate = endTime;
    this.session.endDate = endTime;
    this.error = 0;
  }

  onItemRemove(e: ArrayItemEventArgs): void {
    this.sessions.splice(e.index, 1);
  }

  onLink(shift: EventShift): void {
    this.session.setShift(shift);
  }
}
