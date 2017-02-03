import { Component, OnInit } from '@angular/core';
import { EventDay } from '../applogic-event-form/event-day';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
  eventName: string;
  dayCount: number = 1;
  days: number[] = [0];
  // TODO this page will need an enter the
  // number of day form, then a forloop will 
  // generate an array of components ( app-day-editor-form )
  // for each day, and on save the day is accessed
  // by its index that will be added to the function
  // parameters while in the loop
  // The for loo

  onDaySave(day: EventDay): void {
    console.debug("Save day");
    console.log(day);
  }

  addDay(): void {

    this.days.push((++this.dayCount));
  }
}
