import { PipeTransform, Component, Input, OnInit, OnChanges } from '@angular/core';
import { SessionInfo } from '../applogic-availability/session-info';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {

  // Move this to event creation
  pipe:PipeTransform = new DatePipe('en-US');
  startDate: Date = new Date("0");
  endDate: Date = new Date("0");
  things: any = [
    new Date("2"),
    new Date("3")
  ];
  argh:any[]=['medium'];
  session: SessionInfo = new SessionInfo();
  constructor() {

  }

  report():void{
    console.debug("Length");
    console.log(this.things.length);
  }
}
