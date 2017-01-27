import { Component, Output, EventEmitter } from '@angular/core';
import { TimeOfDay } from '../events/time-of-day.enum';
import { ShortTimeDate } from '../events/short-time-date';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  time: ShortTimeDate = new ShortTimeDate();

  @Output() onSetTime: EventEmitter<ShortTimeDate> =
  new EventEmitter<ShortTimeDate>();

  setTimeOfDay() {
    this.onSetTime.emit(this.time);
  }
}
