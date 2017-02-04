import { Component, Input } from '@angular/core';
import { SessionInfo } from '../../applogic-general/session-info';
import { DatePipe } from '@angular/common';

import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrls: ['./session-editor.component.css']
})
export class SessionEditorComponent {

  @Input() sessions: SessionInfo[];

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
      console.debug("session validate");
      this.error = 1;
      return;
    }
    if (this.session.name.length === 0) {
      // Add error message
      console.debug("session name");
      console.log(this.session.name);
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

  onShiftsSave(): void {
    console.debug("Shift save");
    // Show message or something
  }
}
