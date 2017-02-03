import { Component, OnInit } from '@angular/core';
import { SessionInfo } from '../../availability-grid-src/applogic-availability/session-info';

@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrls: ['./session-editor.component.css']
})
export class SessionEditorComponent {

  // Move this to event creation
  startDate: Date = new Date("0");
  endDate: Date = new Date("0");

  session: SessionInfo = new SessionInfo();

  constructor() { }


}


