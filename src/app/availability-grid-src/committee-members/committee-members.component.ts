import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ng2-bootstrap';

import { Member } from '../../applogic-general/member';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.css']
})
export class CommitteeMembersComponent implements OnChanges {
  public selected: string;

  /**
   * This component will have a copy of the members
   * available in the shift && according to their committee
   * 
   * NOTE: member availability can't be used here as 
   * the auto-complete input doesn't provide deep properties
   * support
   */
  @Input() commShiftMembers: Member[] = [];
  @Input() commName: string;
  selectedMembers: Member[] = [];

  /**
   * Event emitters are used to notify the parent
   * component to modify the original data
   */
  @Output() memberSelected: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() memberReleased: EventEmitter<Member> = new EventEmitter<Member>();

  typeaheadOnSelect(e: TypeaheadMatch) {
    let selected: Member = e.item;

    console.log(e);
    /**
     * Filter the member from the shiftMembers array
     * 
     * This filtering occurrs on the 1 unique instance
     * of memberID <> shift relation.
     * 
     * As 1 member might be available in many committees
     * in the same shift, filtering by memberID will be
     * held by an upper component to remove this member
     * from all their available committees
     * 
     */
    let index: number = this.commShiftMembers.findIndex((m: Member) => {
      if (m.id) {
        return m.id === selected.id;
      } else {
        return m.name === selected.name;
      }
    });

    if (index < 0) {
      console.error("Couldn't find selected");
      return;
    }

    //console.log("Splicing");
    /**
     * Mark the member as selected and notify the parent
     * then do internal stuff
     * Removing the member from the array first
     * causes its index to change
     */
    this.memberSelected.emit(this.commShiftMembers[index]);
    this.commShiftMembers.splice(index, 1);
    this.selectedMembers.push(selected);

    this.selected = "";
  }

  removeMember(val: Member, index: number): void {
    // Remove a previously selected member
    // and return it back to the pool
    // todo use member id

    // use the index to access the array, and splice
    // use the object itself to add its id back to the pool

    const removed: Member = this.selectedMembers.splice(index, 1)[0];
    this.memberReleased.emit(removed);
    this.commShiftMembers.push(removed);
  }

  ngOnChanges() {
    // If no members are provided, create an empty array
    if (!this.commShiftMembers) {
      this.commShiftMembers = [];
    }
  }
}