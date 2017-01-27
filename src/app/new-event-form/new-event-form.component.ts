import { Component, OnInit } from '@angular/core';
import { EventShift } from '../event-shift';

@Component({
  // selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {

  model: EventShift = new EventShift();

  constructor() { }

  ngOnInit() {
    // Fetch any stored event information ?
  }

  addShift(): void {

  }

}
