import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../app-services/member-holder.service';
import { Member } from '../logic/member';
import { Committee } from '../logic/committee';
import { Filters } from '../logic/filters';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styles: []
})
export class ExcelExportComponent implements OnInit {
  memberCount: number = 0;
  allMembers: Member[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      console.debug("Router ", e);
      if (e instanceof NavigationEnd) {
        this.allMembers = this.memberService.members;
        if (typeof this.allMembers === "undefined") throw Error("No members are present");
        console.debug("Members", this.allMembers);
      }

    });
    // this.memberService.memberAssignmentChanged.subscribe(() => {
    //   console.debug("Members changed");
    // });
  }

  getCommittees(): string[] { return Committee.getAll(); }

  shiftMembers: Member[];
  dayMembers: Member[];
  lastSearchedDayIndex: number = -1;
  lastSearchedShiftIndex: number = -1;

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: string): Member[] {

    if (dayIndex !== this.lastSearchedDayIndex) {
      /**
       * Cache the slected members of this day
       */
      this.dayMembers = Filters.selectedInDay(this.allMembers, dayIndex);
      this.lastSearchedDayIndex = dayIndex;
    }

    if (shiftIndex !== this.lastSearchedShiftIndex) {
      /**
       * Cache the members of the shift
       */
      this.shiftMembers = Filters.selectedInShift(this.dayMembers, dayIndex, shiftIndex);
      this.lastSearchedShiftIndex = shiftIndex;
    }

    // Shift has no assigned members
    if (typeof this.shiftMembers === "undefined") return [];

    let commMembers = this.shiftMembers.filter(m => m.getAssignmentAt(dayIndex, shiftIndex).committee === committeeName);

    // This committee has noone assigned
    if (typeof commMembers === "undefined") return [];
    return commMembers;
  }

  /**
   * Used for iteration with ngFor
   */
  getEventDaysDetails(): number[] {
    return this.memberService.days;
  }

  /**
   * Used for iteration with ngFor
   */
  getEventShiftsOfDay(dayIndex: number): number[] {
    return Array(this.memberService.days[dayIndex]).fill(0);
  }
}
