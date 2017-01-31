import { Component, Input } from '@angular/core';
import { EventShift } from '../events/event-shift';
@Component({
  selector: 'app-shift-viewer',
  templateUrl: './shift-viewer.component.html',
  styleUrls: ['./shift-viewer.component.css']
})
export class ShiftViewerComponent {
  @Input() shifts: EventShift[] = [
    {
      start: { hours: 2, minutes: 15, timeOfDay: 0 },
      end: { hours: 2, minutes: 15, timeOfDay: 1 }
    }
  ];
  counter: number = 0;
}
