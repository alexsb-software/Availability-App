import { Component, OnInit } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';
import { EventDataService } from '../../events/eventdata.service';
import { Event } from '../../applogic-general/event';
import { leftFadeInOut, fallIn } from '../../animation/animation'
import { UserAuthService } from '../../user-auth/user-auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  animations: [leftFadeInOut(), fallIn()]
})
export class NewEventComponent implements OnInit {


  event: Event;
  state = 'in';
  error: boolean = false;
  errDetails: String;
  constructor(private service: EventDataService,
    private _userauth: UserAuthService) {
    this.event = new Event();
    this.event.eventDays = [];
  }

  // TODO this page will need an enter the
  // number of day form, then a forloop will 
  // generate an array of components ( app-day-editor-form )
  // for each day, and on save the day is accessed
  // by its index that will be added to the function
  // parameters while in the loop
  // The for loo

  ngOnInit() {
    /**
     * Don't use the router this way, use the
     * guards instead, those are ready in the
     * branch on github
     */
    //     if (!this._userauth.loggedIn()) {
    //         this.router.navigate(['/login'], { queryParams: { returnUrl: '/event/new' }});
    //     }
  }

  removeDay(dayIdx: number) {
    this.event.eventDays.splice(dayIdx, 1);
  }

  addDay(): void {
    this.event.eventDays.push(new EventDay());
  }

  saveEvent(): void {
    if (this.validateEvent()) {
      this.error = false;``
      this.service.postEvent(this.event);
    }
    else {
      // show error
      this.error = true;
    }
  }

  validateEvent(): boolean {
    let nameCheck: boolean = typeof this.event.eventName !== "undefined" && this.event.eventName.length > 0;
    if (!nameCheck) {
      this.errDetails = "Make sure the event has a name";
      console.debug("Name check FAIL");
      return false;
    }


    let shiftCheck: boolean = this.event.eventDays.length > 0;
    if (!shiftCheck) {
      this.errDetails = "Make sure that the event has at least one day";
      console.debug("Shift check FAIL");
      return false;
    }

    return true;
  }
}
