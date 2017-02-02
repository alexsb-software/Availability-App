import { Injectable } from '@angular/core';
import { EventUser } from './event-user';
import { UserAvalability } from '../user_reg/user';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EventDataService {

    private _apiurl = '../api/events.json';

    constructor(private _http: Http) { }

    getEventsList(): Observable<EventUser[]> {
        return this._http.get(this._apiurl)
            .map((response: Response) => this.addAvalArray(<EventUser[]>response.json()));
    }

    addAvalArray(eventslist: EventUser[]): EventUser[] {
        let avalArray: Array<Array<Boolean>>;
        let insideArray: Array<Boolean>;
        let insideForEach: Array<Boolean>;
        eventslist.forEach((event: EventUser, index: number) => {
            avalArray = [];
            insideArray = [];
            for (let j = 0; j < event.numOfShifts; j++) {
                insideArray.push(false);
            }
            for (let i = 0; i < event.numOfDays; i++) {
                insideForEach = insideArray.slice()
                avalArray.push(insideForEach);
            }
            event['avalHash'] = avalArray;
        })

        return eventslist;
    }

    postUserAval(userAval: UserAvalability): Observable<number> {
        return this._http.post(this._apiurl, JSON.stringify(userAval))
            .map((response: Response) => <number>response.status)
    }

}