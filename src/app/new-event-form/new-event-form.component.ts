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

  things: EventShift[] = [
    {
      start: { hours: 2, minutes: 15, isPm: false },
      end: { hours: 2, minutes: 15, isPm: true }
    },
    {
      start: { hours: 3, minutes: 15, isPm: false },
      end: { hours: 4, minutes: 15, isPm: true }
    }
  ];

  // ngOnInit() {
  //   // Fetch any stored event information ?
  // }

  addShift(): void {
    // Validate model
    if (EventShift.isValidShift(this.model)) {
      this.things.push(this.model);
      this.model = new EventShift();
    }
    else {
      // TODO show error
    }
  }

} // NewEventFormComponent
