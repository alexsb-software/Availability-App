import { Component, ViewChildren, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventShift } from '../../applogic-general/event-shift';
import { ArrayItemEventArgs } from '../../applogic-general/dynamic-table/dynamic-table.component';
import {fallIn} from '../../animation/animation';

@Component({
  selector: 'app-shift-editor-form',

  templateUrl: './shift-editor-form.component.html',
  styleUrls: ['./shift-editor-form.component.css'],
  animations:[fallIn()]
})
export class ShiftEditor {

  @Input() shifts: EventShift[];

  model: EventShift = new EventShift();
  hasError: boolean = false;
  pipe: DatePipe = new DatePipe("en-US");
  pipeFormat: string = 'shortTime';

  addShift(): void {
    // ASSUMPTION: No events will start at <x> PM to <y> AM
    // Validate model

    if (EventShift.validate(this.model)) {
      this.hasError = false;

      this.model.number = this.shifts.length + 1;
      this.shifts.push(this.model);

      const lastEnd = new Date(this.model.endDate);
      this.model = new EventShift();
      this.model.startDate = lastEnd;
      this.model.endDate = lastEnd;
    }
    else {
      this.hasError = true;
    }
  }

  shiftRemoved(e: ArrayItemEventArgs): void {
    this.shifts.splice(e.index, 1);
    // TODO shift tab should be removed when a shift is removed
    let updatedShifts: EventShift[] = [];
    // Refresh shift numbers
    for (let i: number = 0; i < this.shifts.length; i++) {
      this.shifts[i].number = i + 1;
    }
  }
} // ShiftEditor

