import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimeOfDay } from '../events/time-of-day.enum';
import { ShortTimeDate } from '../events/short-time-date';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  
  @Input() time: ShortTimeDate;
  @Output() onSetTime: EventEmitter<ShortTimeDate> =
  new EventEmitter<ShortTimeDate>();

  setTimeOfDay() {
    if (this.time)
      this.onSetTime.emit(this.time);
  }
}
