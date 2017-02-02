import { Component, OnInit } from '@angular/core';
import { EventDay } from '../events/event-day';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {

  // TODO this page will need an enter the
  // number of day form, then a forloop will 
  // generate an array of components ( app-day-editor-form )
  // for each day, and on save the day is accessed
  // by its index that will be added to the function
  // parameters while in the loop

  onDaySave(day: EventDay): void {
    console.debug("Save day");
    console.log(day);
  }
}
