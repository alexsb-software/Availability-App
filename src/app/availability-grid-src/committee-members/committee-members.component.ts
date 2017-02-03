import { Component } from '@angular/core';
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
export class CommitteeMembersComponent {
  public selected: string;

  // TODO this class will have the members injected
  // according to their committees from an above 
  // component

  constructor() {
    for (let i: number = 0; i < 5; i++) {
      let m: Member = new Member();
      m.name = "Aido" + i;
      this.members.push(m);
    }

  }

  public members: any[] = [];
  public selectedMembers: Member[] = [];

  typeaheadOnSelect(e: TypeaheadMatch) {
    console.log('Selected value: ', e.item);
    let selected: Member = e.item;

    let index: number = this.members.findIndex((m: Member) => {
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

    // Move the element to the selected array
    this.members.splice(index, 1);
    this.selectedMembers.push(selected);

    this.selected = "";
  }

  removeMember(val: Member, index: number): void {
    // Remove a previously selected member
    // and return it back to the pool
    // todo use member id

    // use the index to access the array, and splice
    // use the object itself to add its id back to the pool

    let removed: Member = this.selectedMembers.splice(index, 1)[0];
    this.members.push(removed);
  }
}
