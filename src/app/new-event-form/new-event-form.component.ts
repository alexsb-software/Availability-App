import { Component, OnInit } from '@angular/core';

import { EventShift } from '../events/event-shift';
import { ShortTimeDate } from '../events/short-time-date';
@Component({
  // selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent {

  model: EventShift = new EventShift();

  constructor() { }

  timeChanged(time: ShortTimeDate, whichTime: string): void {
    if (whichTime === "StartTime") {
      this.model.start = time;
    }
    else if (whichTime == "EndTime") {
      this.model.end = time;
    }


  }

  // ngOnInit() {
  //   // Fetch any stored event information ?
  // }

  addShift(): void {

  }

}
