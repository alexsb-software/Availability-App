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
  assignedMembers: Member[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {
  }

  ngOnInit() {
  }

  getCommittees(): string[] { return Committee.getAll(); }

  shiftMembers: Member[];
  lastSearchedDayIndex: number = NaN;
  lastSearchedShiftIndex: number = NaN;

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: string): Member[] {

    if (dayIndex === this.lastSearchedDayIndex && shiftIndex === this.lastSearchedShiftIndex) {
      this.shiftMembers = Filters.selectedOnly(this.memberService.members, dayIndex, shiftIndex);
      this.lastSearchedDayIndex = dayIndex;
      this.lastSearchedShiftIndex = shiftIndex;
    }

    return this.shiftMembers.filter(m => m.getAssignmentAt(dayIndex, shiftIndex).committee === committeeName);
  }

  getDaysAsIterable(): number[] {
    /**
     * Creates an array to be used with ngFor
     * based on the number of days in the event
     */
    let dayCount: number = this.memberService.getDayCount();
    return Array(dayCount).fill(0);
  }

  getShiftsAsIterable(dayIndex: number): number[] {
    /**
     * Creates an array to be used with ngFor
     * based on the number of days in the event
     */
    console.debug("000", this.memberService.days);
    let shiftCount: number = this.memberService.days[dayIndex];
    console.debug("Day shift ", dayIndex, shiftCount);
    return Array(shiftCount).fill(0);
  }
}
