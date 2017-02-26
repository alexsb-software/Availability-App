import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-shift',
  templateUrl: './day-shift.component.html',
  styles: []
})
export class DayShiftComponent implements OnInit {
  @Input() dayIndex: number;
  @Output() changed: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
  shiftCount: number = 1;
  ngOnInit() {
  }

  textChange() {
    console.debug("Me");
  }
}
