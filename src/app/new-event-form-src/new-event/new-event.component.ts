import { Component, OnInit } from '@angular/core';
import { EventDay } from '../../applogic-general/event-day';
import { EventDataService } from '../../events/eventdata.service';
import { Event } from '../../applogic-general/event';
import {leftFadeInOut,fallIn } from '../../animation/animation'
import {UserAuthService} from '../../user-auth/user-auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  animations:[leftFadeInOut(),fallIn()]
})
export class NewEventComponent implements OnInit {
  eventName: string;
  dayCount: number = 1;
  event: Event;
  state = 'in';

  constructor(private service: EventDataService,
    private _userauth: UserAuthService,
    private router: Router) {
    this.event = new Event();
    this.event.eventDays = [];
    //this.event.eventDays.push(new EventDay());
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
    ++this.dayCount;
    this.event.eventDays.push(new EventDay());
  }

  saveEvent(): void {
    console.log(this.event);
    this.service.postEvent(this.event);
  }
}
