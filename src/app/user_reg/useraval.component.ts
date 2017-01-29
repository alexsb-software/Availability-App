import { Component, OnInit } from '@angular/core';
import { EventUser } from '../events/event';
import { EventDataService } from '../events/eventdata.service';  

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
        console.log(this.eventData);
    }

    onChanged(i: number, j: number): void {
        console.log("Called with: ", i, j);
        let day: Boolean[] = this.eventData.avalHash[i];
        day[j] = !day[j];
        console.log(this.eventData.avalHash);
    }

    onEventSelected(id: number): void {
        console.log(id);
        if (id == 0)    this.eventData = null;
        this.eventData = this.eventsList[this.getEventIndex(id)];
        console.log(this.getEventIndex(id));
    }

    getEventIndex(id: number): number {
        let eventIndex = -1;
        this.eventsList.forEach((event: EventUser, index: number) => {
            if(event.id == id) eventIndex = index;
        })
        return eventIndex;
    }

}