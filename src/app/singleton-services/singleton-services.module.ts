import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityHolderService } from './availability-holder.service';

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
    AvailabilityHolderService
  ]
})
export class SingletonServicesModule { }
