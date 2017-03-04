import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

import {Member} from '../../../logic/member';
import {ArrayItemEventArgs} from '../../../elastic-table/elastic-table.component';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitteeMembersComponent {
  @Input('FreeMembers') freeMembers: Member[] = [];
  @Input('SelectedMembers') selectedMembers: Member[] = [];
  @Input('CommitteeName') commName: string; // Used in HTML

  /**
   * Trigger change detection using the event emitter
   */
  @Output('MemberSelected') onMemberSelect: EventEmitter<Member> = new EventEmitter<Member>();
  @Output('MemberReleased') onMemberRelease: EventEmitter<Member> = new EventEmitter<Member>();

  select(e: ArrayItemEventArgs) {
    let selectedMember: Member = e.object;
    this.onMemberSelect.emit(selectedMember);
  }

  deselect(e: ArrayItemEventArgs) {
    let releasedMember: Member = e.object;
    this.onMemberRelease.emit(releasedMember);
  }
}
