import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnDestroy,
  EventEmitter,
  OnInit
} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {DayInfoHolderService} from '../../../app-services/day-info-holder.service';
import {MemberInfoHolderService} from '../../../app-services/member-info-holder.service';
import {Committee} from '../../../logic/committee';
import {Filters} from '../../../logic/filters';
import {Member} from '../../../logic/member';

@Component({
  selector: 'app-shift-tasks',
  templateUrl: './shift-tasks.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShiftTasksComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private memberService: MemberInfoHolderService) {

  }

  dayIndex: number;
  members: Member[] = [];
  subscription: Subscription;
  shiftIndex: number;

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.shiftIndex = p['id'];
      this.dayIndex = p['dayIndex']
    });

    this.subscription = this.router.events.subscribe(e => {

      // Redirect in case that members are undefined/of length 0
      try {
        if (this.members.length === 0) {
          this.router.navigateByUrl('');
          return;
        }

      } catch (error) {
        this.router.navigateByUrl('');
        return;
      }

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
    this.memberService.memberAssignmentChanged.emit(e);
  }

  releaseMember(e: Member): void {
    // Check if the member is assigned at a session
    if (this.memberService
        .isAssignedAtSessionOnly(this.dayIndex,
          this.shiftIndex, e)) {
      // TODO show error
      alert("Member is reserved at a session at the same time, delete the session if you want to release the member");
      return;
    }
    e.release(this.dayIndex, this.shiftIndex);
    this.memberService.memberAssignmentChanged.emit(e);
  }
}
