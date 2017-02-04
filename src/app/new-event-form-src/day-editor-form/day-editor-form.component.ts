import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { EventShift } from '../../applogic-general/event-shift';
import { EventDay } from '../../applogic-general/event-day';
import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';
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
    // TODO replace events with binding
    this.eventDay.dayDate = newDate;

    // Chnage panel to panel-success when save clicked
  }

  saveDay(): void {
    // Called when success button is clicked
    this.daySaved.emit(this.eventDay);
    this.eventDay.shifts
  }

  onSessionsSave(): void {
    console.debug("Will save sessions");
  }
  updateSessions(deletedShiftNum: number): void {
    for (let i: number = 0; i < this.eventDay.sessions.length; i++) {
      // Remove the items of the deleted shift
      if (this.eventDay.sessions[i].shiftNumber == deletedShiftNum) {
        this.eventDay.sessions.splice(i, 1);
      }

    }
  }
}