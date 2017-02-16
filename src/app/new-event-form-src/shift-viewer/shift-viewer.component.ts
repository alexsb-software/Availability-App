import { Component, Input } from '@angular/core';
import { EventShift } from '../../applogic-general/event-shift';
@Component({
  selector: 'app-shift-viewer',
  templateUrl: './shift-viewer.component.html',
  styleUrls: ['./shift-viewer.component.css']
})
export class ShiftViewerComponent {
  // Shifts will be set by a container
  @Input() shifts: EventShift[];

  counter: number = 0;
  visible: boolean = false;
  removeShift(shift: EventShift): void {

    let index: number = this.shifts.indexOf(shift);
    if (index !== -1) {
      this.shifts.splice(index, 1);
      console.debug("Deleted");
    } else {
      console.error("Failed to delete");
    }
  }
}
