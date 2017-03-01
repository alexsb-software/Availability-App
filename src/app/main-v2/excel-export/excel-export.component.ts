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
  eventInfo: Map<string, Member[]>[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.eventInfo = this.memberService.prettyFormat();
      }
    });
  }

  getCommittees(): string[] { return Committee.getAll(); }

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: number): Member[] {
    return [];
    //return this.eventInfo[0].get();
  }

  getDaysAsIterable(): number[] {
    /**
     * Creates an array to be used with ngFor
     * based on the number of days in the event
     */
    let dayCount: number = this.memberService.getDayCount()
    return Array(dayCount).fill(0);
  }

}
