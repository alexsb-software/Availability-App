import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DayInfoHolderService } from '../app-services/day-info-holder.service';
import { MemberInfoHolderService } from '../app-services/member-info-holder.service';

import { Member } from '../logic/member';
import { CommitteeEnum } from '../logic/committee';
import { Filters } from '../logic/filters';
@Component({
  selector: 'app-member-assignment',
  templateUrl: './member-assignment.component.html',
  styles: []
})
export class MemberAssignmentComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  isEmpty: boolean = true;
  dayShifts: number[] = [];
  subscription: Subscription;

  constructor(private dayService: DayInfoHolderService,
    private memberService: MemberInfoHolderService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.dayShifts = this.dayService.dayShifts;

        this.members = this.memberService.members;
        if (this.members.length === 0) {
          this.isEmpty = true; return;
        }
        this.isEmpty = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
