import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventShift } from '../applogic-event-form/event-shift';
import { EventDay } from '../applogic-event-form/event-day';
//import { ShortTimeDate } from '../../applogic-general/short-time-date';
@Component({
  selector: 'app-day-editor-form',
  templateUrl: './day-editor-form.component.html',
  styleUrls: ['./day-editor-form.component.css']
})
export class DayEditorFormComponent {
  @Output() daySaved: EventEmitter<EventDay> = new EventEmitter<EventDay>();
  @Input() dayNumber: number;
  eventDay: EventDay = new EventDay();
  visible: boolean = false;


  onDateChanged(newDate: Date): void {
    this.eventDay.dayDate = newDate;
    //console.debug(this.eventDay.dayDate.toString());
    // Chnage panel to panel-success when save clicked
  }
  
  onShiftSubmit(shift: EventShift) {
    this.eventDay.shifts.push(shift);
  }

  saveDay(): void {
    // Called when success button is clicked
    this.daySaved.emit(this.eventDay);
  }
}