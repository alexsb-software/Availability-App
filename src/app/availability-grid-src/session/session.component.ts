import { Component, OnInit, OnChanges } from '@angular/core';
import { TimePickerComponent } from '../../new-event-form-src/time-picker/time-picker.component';
import { ShortTimeDate } from '../../applogic-general/short-time-date';
import { SessionInfo } from '../applogic-availability/session-info';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnChanges {
  startDate: Date = void 0;
  endDate: Date = void 0;
  session: SessionInfo = new SessionInfo();

  ngOnChanges(): void {
    this.session.end
    // TODO replace toDate with more useful thing
    // ShortTimeDate.toDate(this.startDate);
    // ShortTimeDate.toDate(this.endDate);
  }

  onSesionTimeSet(time: ShortTimeDate, timeType: string): void {
    if (timeType === 'StartTime') {
      this.session.start = time;
    }
    else if (timeType === 'EndTime') {
      this.session.end = time;
    }
    else {
      console.error("Undefined time type, SessionComponent");
    }
  }

}
