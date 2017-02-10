import { Component, OnInit } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
  eventName: string;
  dayCount: number = 1;
  days: EventDay[] = [new EventDay()];

  // TODO this page will need an enter the
  // number of day form, then a forloop will 
  // generate an array of components ( app-day-editor-form )
  // for each day, and on save the day is accessed
  // by its index that will be added to the function
  // parameters while in the loop
  // The for loo

  removeDay(dayIdx: number) {
    this.days.splice(dayIdx, 1);
  }

  addDay(): void {
    ++this.dayCount;
    this.days.push(new EventDay());
  }
}
