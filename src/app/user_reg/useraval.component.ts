import { Component, OnInit } from '@angular/core';
import { EventUser } from '../events/event-user';
import { EventDataService } from '../events/eventdata.service';  
import { UserAvalability } from '../user_reg/user';

@Component({
    templateUrl: './useraval.component.html',
    styleUrls: ['./useraval.component.css']
})

export class UserAvalComponent implements OnInit{

    constructor(private _eventdata: EventDataService){}

    eventData: EventUser;
    eventsList: EventUser[];
    choosedEventId: number = 0;

    ngOnInit(): void {
        this._eventdata.getEventsList().subscribe(
            eventslist => this.eventsList = eventslist,
            error => console.log(error)
        );
    }
    
    onSaveClicked(): void {
        let useraval: UserAvalability = {
            eventId: this.choosedEventId,
            userId: 0, // TODO
            avalHash: this.eventData.avalHash
        }
        this._eventdata.postUserAval(useraval).subscribe(
            status => {
                if (status = 200) {
                    console.log("Success");
                } else {
                    console.log("Fail");
                }
            }, 
            error => {
                console.log("Something went wrong");
            }
        );
    }

    onChanged(i: number, j: number): void {
        this.eventData.avalHash[i][j] = !this.eventData.avalHash[i][j];
    }

    onEventSelected(id: number): void {
        if (id == 0)    this.eventData = null;
        this.eventData = this.eventsList[this.getEventIndex(id)];
    }

    getEventIndex(id: number): number {
        let eventIndex = -1;
        this.eventsList.forEach((event: EventUser, index: number) => {
            if(event.id == id) eventIndex = index;
        })
        return eventIndex;
    }

}