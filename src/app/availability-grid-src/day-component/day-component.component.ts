import { Component, OnInit, Input } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';

@Component({
  selector: 'app-day-component',
  templateUrl: './day-component.component.html',
  styleUrls: ['./day-component.component.css']
})
export class DayComponentComponent implements OnInit {

  @Input() days: EventDay[];

  constructor() { }

  ngOnInit() {
  }

}
