import { Injectable } from '@angular/core';
import { EventUser } from './event-user';
import { UserAvalability } from '../user_reg/user';
import { Event } from '../applogic-general/event';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from '../user-auth/user-auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class EventDataService {

    private _apiurl = '../api/events.json';
    private _eventapi = "http://localhost/api/event/";
    private _availapi = "http://localhost/api/reg/availabilty.php";
    private newEventAPI = 'https://avalapp-mahmoudmcd1.c9users.io/hello-world.php';

    constructor(private _http: Http, private _userauth: UserAuthService) { }

    getEventsList(): Observable<EventUser[]> {
    //     return this._http.get(this._eventapi + "event_list.php")
    //         .map((response: Response) => this.addAvalArray(response.json()));
        return this._http.get(this._eventapi + "event_list.php")
            .map((response: Response) => (response.json()));
    }

    addAvalArray(eventslist: EventUser[]): EventUser[] {
        // console.log(eventslist);
        let avalArray: Array<Array<Boolean>>;
        let insideArray: Array<Array<Object>>;
        let insideForEach: Array<Object>;
        // eventslist.forEach((event: EventUser, index: number) => {
        //     avalArray = [];
        //     insideArray = [];
        //     for (let j = 0; j < event.numOfShifts; j++) {
        //         insideArray.push(false);
        //     }
        //     for (let i = 0; i < event.numOfDays; i++) {
        //         insideForEach = insideArray.slice()
        //         avalArray.push(insideForEach);
        //     }
        //     event['avalHash'] = avalArray;
        // })

        // console.log("This fucking function with called with ")
        
        eventslist.forEach((eventUser: EventUser, index: number) => {
            avalArray = [];
            let event:Event = eventUser.event;
            for (let day of event.eventDays) {
                let insideForEach = [];
                for (let shift of day.shifts) {
                    // insideForEach.push({
                    //     start: shift.startDate,
                    //     end: shift.endDate,
                    //     available: false
                    // })
                    insideForEach.push(false)
                }
                avalArray.push(insideForEach)
            }
            eventUser.avalHash = avalArray;
        })

        return eventslist;
    }

    postUserAval(userAval: UserAvalability): Observable<number> {
        let headers = new Headers({'Authorization': `${this._userauth.getAuthToken()}`});
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        return this._http.post(this._availapi, JSON.stringify(userAval), options)
            .map((response: Response) => <number>response.status)
    }

    postEvent(event: Event): Observable<number> {
        console.log(this.parseToJson(event));
        let headers = new Headers({ 'Authorization': this._userauth.getAuthToken() });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.newEventAPI, JSON.stringify(this.parseToJson(event)), options)
            .map((response: Response) => <number>response.status)
    }

    private parseToJson(event: Event): Object {

        let eventObj = {
            'eventName': event.eventName,
            'eventDays': []
        }


        for (let day of event.eventDays) {

            let eventDayObj = {
                'dayDate': day.dayDate,
                'shifts': []
            }

            for (let shift of day.shifts) {

                let shiftObj = {
                    'number': shift.number,
                    'startDate': shift.startDate,
                    'endDate': shift.endDate,
                    'sessions': []
                }

                for (let session of shift.sessions) {
                    let sessionObj = {};
                    sessionObj['name'] = session.name;
                    sessionObj['notes'] = session.notes;
                    sessionObj['reporting'] = session.reporting.id;
                    sessionObj['pr'] = session.publicRelations.id;
                    shiftObj.sessions.push(sessionObj);
                }

                eventDayObj.shifts.push(shiftObj);
            }

            eventObj.eventDays.push(eventDayObj);
        }

        return eventObj;
    }

}