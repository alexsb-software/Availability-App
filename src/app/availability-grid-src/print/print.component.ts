import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AvailabilityHolderService } from '../../singleton-services/availability-holder.service';
import { DayAvailability } from '../../applogic-general/day-availability';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { SessionInfo } from '../../applogic-general/session-info';
import { ShiftAssignmentInfo, MemberAssignments, DayAssignmentInfo } from '../../applogic-general/assignment-info';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  dayAssignments: DayAssignmentInfo[];

  constructor(private holder: AvailabilityHolderService, private router: Router) {
    this.router.events.subscribe(v => {
      if (v instanceof NavigationEnd) {
        //console.log(this.holder);
        this.dayAssignments = this.holder.eventAvailability;
      }
    });
  }

  ngOnInit() {
  }

}
