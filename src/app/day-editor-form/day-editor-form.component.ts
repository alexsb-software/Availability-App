import { Component, Output, EventEmitter } from '@angular/core';

import { EventShift } from '../events/event-shift';
import { EventDay } from '../events/event-day';
import { ShortTimeDate } from '../events/short-time-date';
@Component({
  selector: 'app-day-editor-form',
  templateUrl: './day-editor-form.component.html',
  styleUrls: ['./day-editor-form.component.css']
})
export class DayEditorFormComponent {
  @Output() daySaved: EventEmitter<EventDay> = new EventEmitter<EventDay>();

  eventDay: EventDay = new EventDay();
  visible: boolean = false;

  constructor() {

    this.eventDay.shifts = [
      {
        start: { hours: 2, minutes: 15, isPm: false },
        end: { hours: 2, minutes: 15, isPm: true }
      },
      {
        start: { hours: 3, minutes: 15, isPm: false },
        end: { hours: 4, minutes: 15, isPm: true }
      }
    ];

  }

  onDateChanged(newDate: Date): void {
    this.eventDay.dayDate = newDate;
    //console.debug(this.eventDay.dayDate.toString());
    // Chnage panel to panel-success when save clicked
  }

  onShiftSubmit(shift: EventShift) {
    console.debug("Add shift");
    this.eventDay.shifts.push(shift);

    let lastEndTime: ShortTimeDate = shift.end;

    // Slide through shifts
    shift.start = lastEndTime;
  }

  saveDay(): void {
    // Called when success button is clicked
    this.daySaved.emit(this.eventDay);
  }
}