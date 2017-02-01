import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { EventShift } from '../events/event-shift';
import { ShortTimeDate } from '../events/short-time-date';
@Component({
  selector: 'app-shift-editor-form',
  templateUrl: './shift-editor-form.component.html',
  styleUrls: ['./shift-editor-form.component.css']
})
export class ShiftEditor {

  @Input() shift: EventShift;
  @Output() shiftAdded: EventEmitter<void> = new EventEmitter<void>();
  
  hasError: boolean = false;

  timeChanged(time: ShortTimeDate, whichTime: string): void {
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
      this.shiftAdded.emit();
    }
    else {
      this.hasError = true;
    }
  }
} // ShiftEditor
