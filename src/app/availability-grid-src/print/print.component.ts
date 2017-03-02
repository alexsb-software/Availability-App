import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DayAvailability } from '../../applogic-general/day-availability';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';
import { Committee, CommitteeEnum } from '../../applogic-general/committee';
import { SessionInfo } from '../../applogic-general/session-info';
import { ShiftAssignmentInfo, MemberAssignments, DayAssignmentInfo } from '../../applogic-general/assignment-info';
import { StateSaverService } from '../../singleton-services/state-saver.service';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  dayAssignments: DayAssignmentInfo[] = [];
  //committeeMember: Map<string, Member[]> = new Map<string, Member[]>();
  committees: string[] = Committee.getAll();

  constructor(private holder: StateSaverService, private router: Router) {
    this.router.events.subscribe(v => {
      if (v instanceof NavigationEnd) {
        //console.log(this.holder);
        this.dayAssignments = this.holder.eventAssignmentInfo;
        //console.log("Day count: " + this.dayAssignments.length);
        //console.log(this.dayAssignments);
      }
    });
  }
  extractCommitteeInfos(dayIdx: number, shiftIdx: number, commName: string): Member[] {
    let allMembers: Map<Member, string> = this.dayAssignments[dayIdx].shiftInfos[shiftIdx].committeeMembers;
    let commMembers: Member[] = [];

    allMembers.forEach((c, m) => {
      if (c === commName) commMembers.push(m);
    });

    return commMembers;
  }
  ngOnInit() {
  }

}
