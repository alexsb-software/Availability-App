import { Injectable } from '@angular/core';
import { EventUser } from './event';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EventDataService{

    private _apiurl = '../api/events.json';

    constructor(private _http: Http){}

    getEventsList(): Observable<EventUser[]>{
        return this._http.get(this._apiurl)
            .map((response: Response) => this.addAvalArray(<EventUser[]> response.json()));
    }

    addAvalArray(eventslist: EventUser[]): EventUser[]{
        let avalArray: Array<Array<Boolean>>;
        let insideArray: Array<Boolean>;
        eventslist.forEach((event: EventUser, index: number) => {
            avalArray = [];
            insideArray = [];
            for (let j = 0; j < event.numOfShifts; j++) {
                insideArray.push(false);
            }
            for (let i = 0; i < event.numOfDays; i++) {  
                avalArray.push(insideArray);
            }
            event['avalHash'] = avalArray;
        })

        return eventslist;
    }

}