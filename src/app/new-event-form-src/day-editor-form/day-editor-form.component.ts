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
  @Input() dayIdx: number;
  @Input() eventDay: EventDay = new EventDay();
  @Output() onDeleteDay: EventEmitter<number> = new EventEmitter<number>();
  sessionCount: number = 0;
  visible: boolean = false;


  onDateChanged(newDate: Date): void {
    // TODO replace events with binding
    this.eventDay.dayDate = newDate;

    // Chnage panel to panel-success when save clicked
  }

  deleteDay(): void {
    //console.debug("Delete day");
    this.onDeleteDay.emit(this.dayIdx);
  }

  sessionsChange() {
    this.sessionCount = this.eventDay.getSessionCount();
  }
}