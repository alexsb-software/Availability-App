import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Member } from '../../applogic-general/member';
import { EventDay } from '../../applogic-general/event-day';
import { SessionInfo } from '../../applogic-general/session-info';
import { EventShift } from '../../applogic-general/event-shift';
import { CommitteeEnum, Committee } from '../../applogic-general/committee';
import { DayAvailability } from '../../applogic-general/day-availability';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { AvailabilityHolderService } from '../../singleton-services/availability-holder.service';
import { StateSaverService } from '../../singleton-services/state-saver.service';
import { MemberLine } from '../../excel-interface/excel-interface.component';

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

  days: DayAvailability[] = [];
  testId: number = 0;
  dayKey: string = "day";

  // Current page starts at 1 not 0 
  public currentPageIndex: number = 0;

  constructor(private router: Router, private holder: AvailabilityHolderService, private stateHolder: StateSaverService) { }

  ngOnInit() {
    let excelKey: string = "excel";

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        //console.debug("navigated to home");
        if (this.stateHolder.exists(excelKey)) {
          //console.debug("data exists");

          let excelData = this.stateHolder.get(excelKey);
          let day: DayAvailability = this.transformExcelData(excelData);
          let daysTemp: DayAvailability[] = [];


          daysTemp.push(day);
          this.stateHolder.delete(excelKey)

          this.days = daysTemp;
          this.holder.eventAvailability = this.days;
          //console.debug(day.availabilities.length);
        }
      }
    });
  }


  onSaveDay(e: ShiftAssignmentInfo[], dayIdx: number): void {
    console.log("Save day");
    this.holder.eventAssignmentInfo[dayIdx] = new DayAssignmentInfo();
    this.holder.eventAssignmentInfo[dayIdx].shiftInfos = e;
    this.holder.eventAssignmentInfo[dayIdx].dayNumber = dayIdx;
  }

  transformExcelData(memberLines: MemberLine[]): DayAvailability {
    let day = new DayAvailability();
    day.availabilities = [];
    let eDay: EventDay = new EventDay();
    eDay.shifts = [];
    eDay.dayDate = new Date("1/1/2000");
    day.day = eDay;
    day.shifts = [];
    let id = 0;
    //-----------------------------
    let sh: EventShift;
    for (let j = 0; j < 2; j++) {
      sh = new EventShift();
      sh.number = j;
      sh.sessions = [];
      day.shifts.push(sh);
    }

    for (let line of memberLines) {
      let memAv: MemberAvailability = new MemberAvailability();
      memAv.member = line.member;
      memAv.member.id = id++;
      memAv.shiftIndexes = line.shifts;

      memAv.availabileCommittees = line.committees;
      // Insert all unknown committees
      line.committees.forEach(c => Committee.insertCommittee(c));
      day.availabilities.push(memAv);
    }

    return day;
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
      for (let k = 0; k < 15; k++) {
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
