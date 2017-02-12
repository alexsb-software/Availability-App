import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avialability-root',
  templateUrl: './avialability-root.component.html',
  styleUrls: ['./avialability-root.component.css']
})
/**
 * The root component that will fetch the data
 * and create the day components
 */
export class AvialabilityRootComponent implements OnInit {

  constructor(/*service*/) { }

  ngOnInit() {
    // Call service
  }

// mockDay(): void {

//     //Math.floor(Math.random()*(max-min+1)+min);
//     for (let i = 0; i < 5; i++) {
//       let day = new DayAvailability();
//       day.availbilities = [];
//       let eDay: EventDay = new EventDay();
//       eDay.shifts = [];
//       eDay.dayDate = new Date(i.toString());

//       day.day = eDay;
//       let mAvs: MemberAvailability[] = [];

//       for (let j = 1; j < 3; j++) {
//         let sh: EventShift = new EventShift();
//         sh.number = i;
//         eDay.shifts.push(sh);

//         for (let k = 0; k < 5; k++) {
//           let av: MemberAvailability = new MemberAvailability();
//           av.shiftNumbers = [k, k + 1];
//           av.availabileCommittees = [CommiteeEnum[CommiteeEnum.Logistics]];
//           mAvs.push(av);
//         }
//       }
//       day.availbilities = mAvs;
//     }


//     this.day = day;
//     console.log(this.day);
//   }

}
