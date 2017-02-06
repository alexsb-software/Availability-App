import { Component, Input, OnChanges } from '@angular/core';

import { Committee } from '../../applogic-general/committee';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';

import { ShiftFilterPipe } from './shift-filter.pipe';
import { NameFilterPipe } from './name-filter.pipe';
import { CommFilterPipe } from './comm-filter.pipe';
import { NameSortPipe } from './name-sort.pipe';
import { CommitteeSortPipe } from './committee-sort.pipe';
@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent {

  @Input() memberAvailabilities: MemberAvailability[];

  filteredMemberAvails: MemberAvailability[] = [];

  shiftPipe: ShiftFilterPipe = new ShiftFilterPipe();

  namePipe: NameFilterPipe = new NameFilterPipe();
  nameSortPipe: NameSortPipe = new NameSortPipe();

  commPipe: CommFilterPipe = new CommFilterPipe();
  commSortPipe: CommitteeSortPipe = new CommitteeSortPipe();

  constructor() {
    let arr: MemberAvailability[] = [];
    for (let i: number = 0; i < 200; i++) {
      let memAv: MemberAvailability = new MemberAvailability();

      memAv.availabileCommittee =
        Committee.getCommittee((i % Committee.commLength()));
      memAv.shiftNumber = i % 10;

      let m: Member = new Member();
      m.name = "mem" + i;
      memAv.shiftNumber
      memAv.member = m;
      arr.push(memAv);
    }
    this.memberAvailabilities = arr;
    this.filteredMemberAvails = this.memberAvailabilities;
  }

  filterMembers(filter: string): void {
    if (filter.length === 0) {
      this.filteredMemberAvails = this.memberAvailabilities;
      return;
    }
    
    let shiftFiltered = this.shiftPipe.transform(this.memberAvailabilities, parseInt(filter));
    shiftFiltered = this.commSortPipe.transform(shiftFiltered);
    
    // TODO Committee pipe
    // TODO Name sort

    this.filteredMemberAvails = shiftFiltered;
  }

  resetFilter(): void {
    this.filteredMemberAvails = this.memberAvailabilities;
  }

  filterByName(name: string): void {
    // TODO 
  }

  filterByShift(shift: number): void {
    // TODO 
  }

  filterByComm(commName: string): void {
    // TODO 
  }

  onSearchClicked(e: string) {
    if (e.length === 0) {
      this.resetFilter();
    }
    else {
      this.filterMembers(e);
    }
  }
}