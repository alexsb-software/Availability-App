import { Component, ChangeDetectionStrategy, Input, Output, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../../app-services/member-holder.service';
import { Committee } from '../../logic/committee';
import { Filters } from '../../logic/filters';
import { Member } from '../../logic/member';

@Component({
  selector: 'app-shift-tasks',
  templateUrl: './shift-tasks.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftTasksComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {

  }
  dayIndex: number;
  shiftIndex: number;
  members: Member[] = [];
  subscription: Subscription;

  /**
   * This emitter is used to trigger change detection
   */
  @Output() membersChanged: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.route.parent.params.switchMap(p => this.dayIndex = p['id']).subscribe();
    this.route.params.switchMap(p => this.shiftIndex = p['id']).subscribe();

    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {

        // "dayIndex" is retrieved as a number from router
        let temp: any = this.dayIndex;
        this.dayIndex = parseInt(temp);
        temp = this.shiftIndex;
        this.shiftIndex = parseInt(temp);

        this.members = Filters.byShift(this.memberService.members, this.dayIndex, this.shiftIndex);
      }
    });
  }

  getAllCommittees(): string[] {
    return Committee.getAll();
  }

  getMembersOfCommittee(commName: string): Member[] {
    return Filters.byCommittee(this.members, commName);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
