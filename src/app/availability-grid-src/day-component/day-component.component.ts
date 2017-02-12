import { Component, OnInit, Input } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';

@Component({
  selector: 'app-day-assignment-component',
  templateUrl: './day-component.component.html',
  styleUrls: ['./day-component.component.css']
})
export class DayAssignmentComponentComponent implements OnInit {

  days: EventDay[];

  constructor(/*Service*/) {

  }

  ngOnInit() {
    // Call the Service
    // Update the views
  }

  updateShiftView(): void {

  }

}
