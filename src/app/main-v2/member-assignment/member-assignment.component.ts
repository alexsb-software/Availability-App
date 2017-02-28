import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MemberHolderService } from '../app-services/member-holder.service';
import { Member } from '../logic/member';
import { CommitteeEnum } from '../logic/committee';

import { Filters } from '../logic/filters';

@Component({
  selector: 'app-member-assignment',
  templateUrl: './member-assignment.component.html',
  styles: []
})
export class MemberAssignmentComponent implements OnInit {
  members: Member[] = [];
  isEmpty: boolean = true;
  dayShifts: number[] = [];

  constructor(private memberService: MemberHolderService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.dayShifts = this.memberService.days;
        console.debug("Day shifts:", this.memberService.days);
        this.getMembersFromService();
      }
    });
  }

  getMembersFromService(): void {
    this.members = this.memberService.members;
    console.debug("Members:", this.members.length);
    if (this.members.length === 0) { this.isEmpty = true; return; }

    this.isEmpty = false;
    let dayIndex: number = 0;
    let shiftIndex: number = 0;

    let dayMembers: Member[] = Filters.byDay(this.members, dayIndex);
    let shiftMembers: Member[] = Filters.byShift(this.members, dayIndex, shiftIndex);
    let committeeMembers: Member[] = Filters.byCommittee(shiftMembers, CommitteeEnum.Software);
    console.debug("Software count", committeeMembers.length, committeeMembers);
  }
}
