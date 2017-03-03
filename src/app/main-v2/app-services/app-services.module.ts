import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayInfoHolderService } from './day-info-holder.service';
import { SessionHolderService } from './session-holder.service';
import { MemberInfoHolderService } from './member-info-holder.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DayInfoHolderService, SessionHolderService, MemberInfoHolderService]
})
export class AppServicesModule { }
