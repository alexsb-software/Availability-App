import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ShiftFilterPipe } from '../../applogic-general/member-view/shift-filter.pipe';
import { DayAvailability } from '../../applogic-general/day-availability';
import { Member } from '../../applogic-general/member';
import { ShiftAssignmentInfo, MemberAssignments, DayAssignmentInfo } from '../../applogic-general/assignment-info';
import { CommitteeEnum, Committee } from '../../applogic-general/committee';
import { StateSaverService } from '../../singleton-services/state-saver.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-day-assignment',
  templateUrl: './day-assignment.component.html',
  styleUrls: ['./day-assignment.component.css']
})
export class DayAssignmentComponent implements OnInit, OnDestroy {

  @Input() day: DayAvailability;
  @Output() onSaveDay: EventEmitter<ShiftAssignmentInfo[]> = new EventEmitter<ShiftAssignmentInfo[]>();

  savedShifts: ShiftAssignmentInfo[] = [];

  publicRelSessions: MemberAssignments = new Map<Member, string>();
  reportingsSessions: MemberAssignments = new Map<Member, string>();

  filter: ShiftFilterPipe = new ShiftFilterPipe();
  dayId: string = "";
  routerSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateHolder: StateSaverService) { }

  ngOnInit() {
    this.routerSubscription = this.route.params
      .switchMap(params => this.dayId = params['id'])
      .subscribe(() => {
        // Day ID exists within the array bounds
        if ((+this.dayId) < this.stateHolder.eventAvailability.length) {
          this.day = this.stateHolder.eventAvailability[+this.dayId];
        }
      });
  }

  saveShift(e: MemberAssignments, shiftIndex: number): void {
    // TODO cleanup
    this.savedShifts[shiftIndex] = new ShiftAssignmentInfo();

    this.savedShifts[shiftIndex].shiftIndex = shiftIndex;
    this.savedShifts[shiftIndex].committeeMembers = e;
    this.savedShifts[shiftIndex].sessionInfo = this.day.shifts[shiftIndex].sessions;
    //console.log("Save day");
    //console.log(this.savedShifts);
    // this.onSaveDay.emit(this.savedShifts);

    // Save to the state holder
    this.stateHolder.eventAssignmentInfo[this.dayId] = new DayAssignmentInfo();
    this.stateHolder.eventAssignmentInfo[this.dayId].shiftInfos = this.savedShifts;
    this.stateHolder.eventAssignmentInfo[this.dayId].dayNumber = this.dayId;
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this.routerSubscription.unsubscribe();
  }

}

