import { Component } from '@angular/core';
import { EventUser } from '../events/event';
 
@Component({
    templateUrl: './useraval.component.html',
    styleUrls: ['./useraval.component.css']
})
export class UserAvalComponent{
    eventData: EventUser = {
        eventName: 'Test Event', 
        numOfDays: 3,
        numOfShifts: 3,
        avalHash: [ [false, false, false], 
            [false, false, false],
            [false, false, false] ]
    };
    
}