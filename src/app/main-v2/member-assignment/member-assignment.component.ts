import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MemberHolderService } from '../app-services/member-holder.service';
import { Member } from '../logic/member';
import { Filters } from '../logic/filters';

@Component({
  selector: 'app-member-assignment',
  templateUrl: './member-assignment.component.html',
  styles: []
})
export class MemberAssignmentComponent implements OnInit {
  members: Member[] = [];
  isEmpty: boolean = true;

  constructor(private memberService: MemberHolderService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
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
    console.debug("Day " + dayIndex + ":", Filters.byDay(this.members, dayIndex).length);

    dayIndex = 1;
    console.debug("Day " + dayIndex + ":", Filters.byDay(this.members, dayIndex).length);
  }

}
