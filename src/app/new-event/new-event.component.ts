import { Component, OnInit } from '@angular/core';
import { EventShift } from '../events/event-shift';
import { ShortTimeDate } from '../events/short-time-date';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  model: EventShift = new EventShift();

  constructor() { }

  ngOnInit() {
  }

  shifts: EventShift[] = [
    {
      start: { hours: 2, minutes: 15, isPm: false },
      end: { hours: 2, minutes: 15, isPm: true }
    },
    {
      start: { hours: 3, minutes: 15, isPm: false },
      end: { hours: 4, minutes: 15, isPm: true }
    }
  ];

  onShiftSubmit() {
    
    this.shifts.push(this.model);
    
    let lastEndTime: ShortTimeDate = this.model.end;
    this.model = new EventShift();

    // Slide through shifts
    this.model.start = lastEndTime;
  }
}
