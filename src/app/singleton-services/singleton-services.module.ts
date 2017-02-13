import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityHolderService } from './availability-holder.service';
import { StateSaverService } from './state-saver.service';

/**
 * A singleton service needs to be defined in its own
 * module
 */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    // Singleton service
    AvailabilityHolderService,
    StateSaverService
  ]
})
export class SingletonServicesModule { }
