import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventShift } from '../applogic-event-form/event-shift';

import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-shift-editor-form',
  templateUrl: './shift-editor-form.component.html',
  styleUrls: ['./shift-editor-form.component.css']
})
export class ShiftEditor {
  
  @Input() shifts: EventShift[];

  shift: EventShift = new EventShift();
  hasError: boolean = false;
  pipe: DatePipe = new DatePipe("en-US");
  pipeFormat: string = 'shortTime';

  addShift(): void {
    // ASSUMPTION: No events will start at <x> PM to <y> AM
    // Validate model

    if (EventShift.validate(this.shift)) {
      this.hasError = false;
      this.shifts.push(this.shift);

      const lastEnd = new Date(this.shift.endDate);
      this.shift = new EventShift();
      this.shift.startDate = lastEnd;
      this.shift.endDate = lastEnd;
    }
    else {
      this.hasError = true;
    }
  }

  onShiftRemoved(e: ArrayItemEventArgs): void {
    this.shifts.splice(e.index, 1);
  }

} // ShiftEditor

