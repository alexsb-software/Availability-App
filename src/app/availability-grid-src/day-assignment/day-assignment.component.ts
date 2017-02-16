import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShiftFilterPipe } from '../../applogic-general/member-view/shift-filter.pipe';
import { DayAvailability } from '../../applogic-general/day-availability';
import { Member } from '../../applogic-general/member';
import { ShiftAssignmentInfo, MemberAssignments, DayAssignmentInfo } from '../../applogic-general/assignment-info';
import { CommitteeEnum, Committee } from '../../applogic-general/committee';

@Component({
  selector: 'app-day-assignment',
  templateUrl: './day-assignment.component.html',
  styleUrls: ['./day-assignment.component.css']
})
export class DayAssignmentComponent {

  @Input() day: DayAvailability;
  @Output() onSaveDay: EventEmitter<ShiftAssignmentInfo[]> = new EventEmitter<ShiftAssignmentInfo[]>();

  savedShifts: ShiftAssignmentInfo[] = [];

  publicRelSessions: MemberAssignments = new Map<Member, string>();
  reportingsSessions: MemberAssignments = new Map<Member, string>();

  filter: ShiftFilterPipe = new ShiftFilterPipe();

  saveShift(e: MemberAssignments, shiftIndex: number): void {

    this.savedShifts[shiftIndex] = new ShiftAssignmentInfo();

    this.savedShifts[shiftIndex].shiftIndex = shiftIndex;
    this.savedShifts[shiftIndex].committeeMembers = e;
    this.savedShifts[shiftIndex].sessionInfo = this.day.shifts[shiftIndex].sessions;
    console.log("Save day");
    console.log(this.savedShifts);
    this.onSaveDay.emit(this.savedShifts);
  }

}

