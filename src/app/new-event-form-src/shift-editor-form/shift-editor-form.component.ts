import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { EventShift } from '../applogic-event-form/event-shift';
import { ShortTimeDate } from '../../applogic-general/short-time-date';
@Component({
  selector: 'app-shift-editor-form',
  templateUrl: './shift-editor-form.component.html',
  styleUrls: ['./shift-editor-form.component.css']
})
export class ShiftEditor {
  @Output() shiftAdded: EventEmitter<EventShift> = new EventEmitter<EventShift>();

  shift: EventShift=new EventShift();
  hasError: boolean = false;

  timeChanged(time: ShortTimeDate, whichTime: string): void {
    // To know the difference between a start time and end
    // time change, we pass that from the HTML
    if (whichTime === "StartTime") {
      this.shift.start = time;
    }
    else if (whichTime == "EndTime") {
      this.shift.end = time;
    }
  }

  addShift(): void {
    // Validate model
    if (EventShift.validate(this.shift)) {
      this.hasError = false;
      this.shiftAdded.emit(this.shift);
      
      let lastEndTime = this.shift.end;
      this.shift = new EventShift();
      this.shift.start = lastEndTime;
    }
    else {
      this.hasError = true;
    }
  }
} // ShiftEditor
