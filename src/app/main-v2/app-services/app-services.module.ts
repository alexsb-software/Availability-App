import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayInfoHolderService } from './day-info-holder.service';
import { SessionHolderService } from './session-holder.service';
import { MemberInfoHolderService } from './member-info-holder.service';
import { CommitteeService } from './committee.service';
import { FilterService } from './filter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DayInfoHolderService,
    SessionHolderService,
    MemberInfoHolderService,
    FilterService,
    CommitteeService]
})
export class AppServicesModule {
}
