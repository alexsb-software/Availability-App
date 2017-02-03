import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { EventShift } from '../applogic-event-form/event-shift';
//import { ShortTimeDate } from '../../applogic-general/short-time-date';
@Component({
  selector: 'app-shift-editor-form',
  templateUrl: './shift-editor-form.component.html',
  styleUrls: ['./shift-editor-form.component.css']
})
export class ShiftEditor {
  @Output() shiftAdded: EventEmitter<EventShift> = new EventEmitter<EventShift>();

  shift: EventShift = new EventShift();
  hasError: boolean = false;

  addShift(): void {
    // No events will start at <x> PM to <y> AM
    // Validate model
    if (EventShift.validate(this.shift)) {
      this.hasError = false;
      this.shiftAdded.emit(this.shift);

      const lastEnd = new Date(this.shift.endDate);
      this.shift = new EventShift();
      this.shift.startDate = lastEnd;
      this.shift.endDate = lastEnd;
    }
    else {
      this.hasError = true;
    }
  }
} // ShiftEditor

