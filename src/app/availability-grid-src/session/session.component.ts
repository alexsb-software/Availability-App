import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SessionInfo } from '../applogic-availability/session-info';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

  // Move this to event creation
  startDate: Date = new Date("0");
  endDate: Date = new Date("0");
  reportings
  session: SessionInfo = new SessionInfo();
  constructor() {

  }
}
