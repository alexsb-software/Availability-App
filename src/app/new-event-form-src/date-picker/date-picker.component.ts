import { Component, Output, EventEmitter } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  outputs: ['selectedDate']
})

export class DatePickerComponent {
  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  selected: Date = new Date("0");
  selectedDateText: string;
  private datePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
    showTodayBtn: false,
    sunHighlight: false,
    minYear: 2000,
    showClearDateBtn: false
  };

  // dateChanged callback function called when the user select the date. This is mandatory callback
  // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
  onDateModified(event: IMyDateModel): void {
    let today: Date = new Date("0");

    if (event.date.year < today.getFullYear()) {
      // Show a nice date if the date was cleared
      // using the "X" button
      this.selected.setFullYear(today.getFullYear());
      this.selected.setDate(today.getDate());
      this.dateChanged.emit(this.selected);
      return;
    }

    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.selected.setFullYear(event.date.year);
    // Months in JS date are 0 indexed, the month
    // number is used in the library
    this.selected.setMonth(event.date.month - 1);
    this.selected.setDate(event.date.day);

    this.selectedDateText = this.selected.toDateString();
    this.dateChanged.emit(this.selected);
  }
}