import { Component, Input, Output, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../app-services/member-holder.service';
import { Filters } from '../logic/filters';
import { Member } from '../logic/member';


@Component({
  selector: 'app-day-tasks',
  templateUrl: './day-tasks.component.html',
  styles: []
})
export class DayTasksComponent implements OnInit {

  subscription: Subscription;
  dayIndex: number = -1;
  members: Member[] = [];
  /**
   * Used for ngFor in HTML
   */
  iterableShiftCount: number[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {

  }
  ngOnInit() {
    if (this.memberService.days.length === 0) {
      this.router.navigate(['/v2']);
      // Refresh the browser
      alert("This page won't work at this state, please refresh the browser page");
      return; // TODO cancel navigation
    }
    this.route.params
      .switchMap((params) => this.dayIndex = params['id']).subscribe();

    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {

        // "dayIndex" is retrieved as a number from router
        let temp: any = this.dayIndex;
        this.dayIndex = parseInt(temp);

        this.members = Filters.byDay(this.memberService.members, this.dayIndex);
        let shiftCount = this.memberService.getShiftCount(this.dayIndex);
        console.debug("Shift count", shiftCount, this.dayIndex);

        this.iterableShiftCount = Array(shiftCount).fill(0);
      }
    });
  }
}
