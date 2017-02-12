import { Component, OnInit } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';
import { EventDataService } from '../../events/eventdata.service';
import { Event } from '../../applogic-general/event';
import {leftFadeInOut,fallIn } from '../../animation/animation'
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  animations:[leftFadeInOut(),fallIn()]
})
export class NewEventComponent {
  eventName: string;
  dayCount: number = 1;
  event: Event;
  state = 'in';

  constructor(private service: EventDataService) {
    this.event = new Event();
    this.event.eventDays = [];
    //this.event.eventDays.push(new EventDay());
  }

  // TODO this page will need an enter the
  // number of day form, then a forloop will 
  // generate an array of components ( app-day-editor-form )
  // for each day, and on save the day is accessed
  // by its index that will be added to the function
  // parameters while in the loop
  // The for loo

  removeDay(dayIdx: number) {
    this.event.eventDays.splice(dayIdx, 1);
  }

  addDay(): void {
    ++this.dayCount;
    this.event.eventDays.push(new EventDay());
  }

  saveEvent(): void {
    this.service.postEvent(this.event);
  }
}
