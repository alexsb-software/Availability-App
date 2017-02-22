import { Component, OnInit } from '@angular/core';
import { EventUser } from '../events/event-user';
import { EventDataService } from '../events/eventdata.service';
import { UserAvalability } from '../user_reg/user';
import { leftFadeIn } from '../animation/animation';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './useraval.component.html',
    styleUrls: ['./useraval.component.css'],
    animations: [leftFadeIn()]
})

export class UserAvalComponent implements OnInit {

    constructor(private _eventdata: EventDataService, private userAuth: UserAuthService, private router: Router) { }

    eventData: EventUser;
    eventsList: EventUser[];
    choosedEventId: number = 0;
    state = 'in';

    ngOnInit(): void {

        if (!this.userAuth.loggedIn()) {
            this.router.navigateByUrl('/login');
        }
        
        
        this._eventdata.getEventsList().subscribe(
            eventslist => { 
                console.log(eventslist);
                this.eventsList = this._eventdata.addAvalArray(eventslist);
                // console.log(this.eventsList);
            },
            error => console.error(error)
        );
    
    }

    onSaveClicked(): void {
        
        console.log(this.eventData.avalHash);

        let useraval: UserAvalability = {
            eventId: this.choosedEventId,
            userId: 0, // TODO
            avalHash: this.eventData.avalHash
        }
        this._eventdata.postUserAval(useraval).subscribe(
            status => {
                if (status === 200) {
                    console.debug("Success");
                } else {
                    console.debug("Fail");
                }
            },
            error => {
                console.debug("Something went wrong");
            }
        );
    }

    onChanged(i: number, j: number): void {
        this.eventData.avalHash[i][j] = !this.eventData.avalHash[i][j];
    }

    onEventSelected(id: number): void {
        if (id == 0) this.eventData = null;
        this.eventData = this.eventsList[this.getEventIndex(id)];
        this.choosedEventId = id;
    }

    getEventIndex(id: number): number {
        let eventIndex = -1;
        this.eventsList.forEach((eventuser: EventUser, index: number) => {
            if (eventuser.event.eventId == id) eventIndex = index;
        })
        return eventIndex;
    }

}