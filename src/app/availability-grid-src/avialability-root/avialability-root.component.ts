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

  constructor(private holder: AvailabilityHolderService) {
    //console.log(holder);
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


    for (let j = 1; j < 3 + idx; j++) {
      let sh: EventShift = new EventShift();
      sh.number = j;
      sh.sessions = [];

      // Add sessions to a shift
      for (let k = 1; k < 4 + idx; k++) {
        let session: SessionInfo = new SessionInfo();
        session.name = "se" + k + " " + idx;
        sh.sessions.push(session);
      }

      day.shifts.push(sh);

      // Populate members of the shift
      for (let k = 0; k < 20; k++) {
        let av: MemberAvailability = new MemberAvailability();
        let m: Member = new Member();
        m.name = "w7oksh" + k + " " + j;
        m.id = k * j;
        av.member = m;
        av.shiftIndexes = [0, k + 1];
        av.availabileCommittees =
          [Committee.getCommittee(k % Committee.getAll().length),
          Committee.getCommittee(Committee.getAll().length - 1 - k)];

        day.availabilities.push(av);
      }
    }
    //console.log(day);

    return day;
  }
}
