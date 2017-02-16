import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Committee } from '../../applogic-general/committee';
import { MemberAvailability } from '../../applogic-general/member-availability';
import { Member } from '../../applogic-general/member';

import { ShiftFilterPipe } from './shift-filter.pipe';
import { NameFilterPipe } from './name-filter.pipe';
import { CommFilterPipe } from './comm-filter.pipe';
import { NameSortPipe } from './name-sort.pipe';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnChanges {
  @Input() headerText: string = "All Members"
  @Input() memberAvailabilities: MemberAvailability[] = [];

  filteredMemberAvails: MemberAvailability[] = [];

  searchType: number = 1;
  shiftPipe: ShiftFilterPipe = new ShiftFilterPipe();
  namePipe: NameFilterPipe = new NameFilterPipe();
  nameSortPipe: NameSortPipe = new NameSortPipe();
  commPipe: CommFilterPipe = new CommFilterPipe();

  constructor() {
    this.filteredMemberAvails = this.memberAvailabilities;
  }

  ngOnChanges(e: SimpleChanges): void {
    if (this.filteredMemberAvails.length === 0) {
      this.filteredMemberAvails = this.memberAvailabilities;
    }
  }

  filterMembers(filter: string, searchType: number): void {

    // Return all if nothing was types
    if (filter.length === 0) {
      this.filteredMemberAvails = this.memberAvailabilities;
      return;
    }
    let filtered: MemberAvailability[] = [];



    if (searchType == 1) {
      filtered = this.filterByName(filter);
      console.log(filtered);
    }
    else if (searchType == 2) {
      filtered=this.filterByComm(filter);
    }
    else if (searchType == 3) {
      filtered = this.filterByShift(parseInt(filter));
    }



    // TODO Committee pipe
    // TODO Name sort

    this.filteredMemberAvails = filtered;
  }

  resetFilter(): void {
    this.filteredMemberAvails = this.memberAvailabilities;
  }

  filterByName(name: string): MemberAvailability[] {
    return this.namePipe.transform(this.memberAvailabilities, name);
  }

  filterByShift(shift: number): MemberAvailability[] {
    let shiftFiltered = this.shiftPipe.transform(this.memberAvailabilities, shift);
    shiftFiltered = this.nameSortPipe.transform(shiftFiltered);
    return shiftFiltered;
  }

  filterByComm(commName: string): MemberAvailability[] {
    
    return this.commPipe.transform(this.memberAvailabilities,commName);
  }

  onSearchClicked(e: string) {
    if (!e || e.length === 0) {
      this.resetFilter();
    }
    else {
      this.filterMembers(e, this.searchType);
    }
  }


}