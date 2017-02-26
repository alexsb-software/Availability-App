import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    StateSaverService
  ]
})
export class SingletonServicesModule { }
