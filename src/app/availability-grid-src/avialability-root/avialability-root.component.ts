import { Component, OnInit } from '@angular/core';
import { Member } from '../../applogic-general/member';
import { EventDay } from '../../applogic-general/event-day';
import { SessionInfo } from '../../applogic-general/session-info';
import { EventShift } from '../../applogic-general/event-shift';
import { CommiteeEnum, Committee } from '../../applogic-general/committee';
import { DayAvailability } from '../../applogic-general/day-availability';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { AvailabilityHolderService } from '../../singleton-services/availability-holder.service';
import { ShiftAssignmentInfo, MemberAssignments, DayAssignmentInfo } from '../../applogic-general/assignment-info';

@Component({
  selector: 'app-avialability-root',
  templateUrl: './avialability-root.component.html',
  styleUrls: ['./avialability-root.component.css']
})
/**
 * The root component that will fetch the data
 * and create the day components
 */
export class AvialabilityRootComponent implements OnInit {

  isSaved: boolean = false;
  days: DayAvailability[] = [];
  eventAvailability: DayAssignmentInfo[] = [];
  testId: number = 0;
  constructor(private holder: AvailabilityHolderService) {
  }

  // Current page starts at 1 not 0 
  public currentPage: number = 1;

  public pageChanged(event: any): void {
    this.isSaved = false;
  }

  ngOnInit() {
    let dayTemp: DayAvailability[] = [];
    // Call service
    for (let i: number = 0; i < 3; i++) {
      dayTemp.push(this.mockDay(i));
    }
    this.days = dayTemp;
  }

  onSaveDay(e: ShiftAssignmentInfo[]): void {
    let dayIndex = this.currentPage - 1;

    this.holder.eventAvailability[dayIndex] = new DayAssignmentInfo();
    this.holder.eventAvailability[dayIndex].shiftInfos = e;
    this.holder.eventAvailability[dayIndex].dayNumber = dayIndex;

    this.isSaved = true;
    console.log(this.holder);
  }

  mockDay(idx: number): DayAvailability {
    let day = new DayAvailability();
    day.availabilities = [];
    let eDay: EventDay = new EventDay();
    eDay.shifts = [];
    eDay.dayDate = new Date("1/1/2000");
    day.day = eDay;
    day.shifts = [];

    let sh: EventShift;
    for (let j = 0; j < 3 + idx; j++) {
      sh = new EventShift();
      sh.number = j;
      sh.sessions = [];

      // Add sessions to a shift
      for (let k = 0; k < 4 + idx; k++) {
        let session: SessionInfo = new SessionInfo();
        session.name = "se" + k + " " + idx;
        sh.sessions.push(session);
      }

      day.shifts.push(sh);

      // Populate members of the shift
      for (let k = 0; k < 12; k++) {
        let av: MemberAvailability = new MemberAvailability();
        let m: Member = new Member();
        // Math.floor(Math.random() * (max - min + 1)) + min
        m.name = "w7oksh" + (k + j) * (idx + 1) + " " + (Math.floor(Math.random() * (100 - 2 + 1)) + 2);
        m.id = this.testId++;
        av.member = m;
        av.shiftIndexes = [sh.number];
        av.availabileCommittees =
          [Committee.getCommittee(k % Committee.getAll().length),
          Committee.getCommittee(Math.abs((Committee.getAll().length - 1 - k)) % Committee.getAll().length)];

        day.availabilities.push(av);
      }
    }

    return day;
  }
}
