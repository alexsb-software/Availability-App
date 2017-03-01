import { Component, Input, DoCheck, Output, EventEmitter, OnInit } from '@angular/core';

import { Member } from '../../logic/member';
import { ArrayItemEventArgs } from '../../elastic-table/elastic-table.component';
@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styles: []
})
export class CommitteeMembersComponent implements OnInit, DoCheck {
  @Input() members: Member[] = [];
  selected: Member[] = [];
  constructor() { }

  ngOnInit() {
  }

  select(e: ArrayItemEventArgs) {
    console.debug("select member");
  }
  deselect(e: ArrayItemEventArgs) {
    console.debug("remove member");
  }
  ngDoCheck() {
    console.debug("Check");
  }
}
