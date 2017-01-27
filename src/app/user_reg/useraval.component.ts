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
        avalHash: [ [true, false, false], 
            [false, false, false],
            [false, false, false] ]
    };

    onSaveClicked(): void {
        console.log(this.eventData);
    }
    
    onChanged(i: number, j: number): void {
        this.eventData.avalHash[i][j] = !this.eventData.avalHash[i][j];
        console.log("sup");
    }
}