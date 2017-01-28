import { Injectable } from '@angular/core';
import { EventUser } from './event';

@Injectable()
export class EventDataService{

    getEventsList(): EventUser[]{
        return [{
            id: 1,
            title: 'firstEvent',
            numOfDays: 5,
            numOfShifts: 3,
            avalHash: [ [true, false, false], 
                [false, false, false],
                [false, false, false] ]
        },{
            id: 2,
            title: 'secondEvent',
            numOfDays: 5,
            numOfShifts: 3,
            avalHash: [ [false, false, false], 
                [false, false, false],
                [false, false, true] ]
        }];
    }

}