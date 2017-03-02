import { Component, OnChanges, ChangeDetectionStrategy, Input, Output, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../../../app-services/member-holder.service';
import { Committee } from '../../../logic/committee';
import { Filters } from '../../../logic/filters';
import { Member } from '../../../logic/member';

@Component({
  selector: 'app-shift-tasks',
  templateUrl: './shift-tasks.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShiftTasksComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {

  }
  dayIndex: number;
  members: Member[] = [];
  subscription: Subscription;
  selectedMembers: Member[] = [];
  shiftIndex: number;

  ngOnInit() {
    //this.route.parent.params.switchMap(p => this.dayIndex = p['id']).subscribe();

    this.route.params.subscribe(p => {
      this.shiftIndex = p['id'];
      this.dayIndex = p['dayIndex']
    });

    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {

        let temp: any = this.dayIndex;
        this.dayIndex = parseInt(temp);

        // Parse shift index
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
    let commMembers: Member[] = Filters.byCommittee(this.members, commName);
    return Filters.freeOnly(commMembers, this.dayIndex, this.shiftIndex);
  }

  getSelectedMembersOfCommittee(commName: string): Member[] {
    let commMembers: Member[] = Filters.byCommittee(this.members, commName);
    return Filters.selectedOnlyByCommittee(commMembers, this.dayIndex, this.shiftIndex, commName);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  takeMember(commName: string, e: Member): void {
    e.reserve(this.dayIndex, this.shiftIndex, commName);
    this.memberService.memberAssignmentChanged.emit();
  }
  releaseMember(e: Member): void {
    e.release(this.dayIndex, this.shiftIndex);
    this.memberService.memberAssignmentChanged.emit();
  }
}
