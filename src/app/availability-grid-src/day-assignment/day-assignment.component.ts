import { Component, Input } from '@angular/core';
import { DayAvailability } from '../../applogic-general/day-availability';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { EventDay } from '../../applogic-general/event-day';
import { SessionInfo } from '../../applogic-general/session-info';
import { EventShift } from '../../applogic-general/event-shift';
import { ShiftFilterPipe } from '../../applogic-general/member-view/shift-filter.pipe';
import { CommiteeEnum, Committee } from '../../applogic-general/committee';
@Component({
  selector: 'app-day-assignment',
  templateUrl: './day-assignment.component.html',
  styleUrls: ['./day-assignment.component.css']
})
export class DayAssignmentComponent {
  @Input() day: DayAvailability;
  filter: ShiftFilterPipe = new ShiftFilterPipe();

  constructor() {
    this.mockDay();

  }

  mockDay(): void {

    //Math.floor(Math.random()*(max-min+1)+min);

    this.day = new DayAvailability();
    this.day.availabilities = [];
    let eDay: EventDay = new EventDay();
    eDay.shifts = [];
    eDay.dayDate = new Date("1/1/2000");
    this.day.day = eDay;
    this.day.shifts = [];


    for (let j = 1; j < 3; j++) {
      let sh: EventShift = new EventShift();
      sh.number = j;
      sh.sessions = [];

      // Add sessions to a shift
      for (let k = 0; k < 4; k++) {
        let session: SessionInfo = new SessionInfo();
        session.name = "se" + k;
        sh.sessions.push(session);
      }

      this.day.shifts.push(sh);

      // Populate members of the shift
      for (let k = 0; k < 20; k++) {
        let av: MemberAvailability = new MemberAvailability();
        let m: Member = new Member();
        m.name = "w7oksh" + k + " " + j;
        m.id = k * j;
        av.member = m;
        av.shiftNumbers = [0, k + 1];
        av.availabileCommittees =
          [Committee.getCommittee(k % Committee.getAll().length),
          Committee.getCommittee(Committee.getAll().length - 1 - k)];

        this.day.availabilities.push(av);
      }
    }
    console.log(this.day);
  }

}

