import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DayInfoHolderService } from '../app-services/day-info-holder.service';
import { MemberInfoHolderService } from '../app-services/member-info-holder.service';
import { SessionHolderService } from '../app-services/session-holder.service';


import { Member } from '../logic/member';
import { Committee } from '../logic/committee';
import { Filters } from '../logic/filters';
import { saveAs } from 'file-saver';
import * as XLSX from 'ts-xlsx';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styles: []
})
export class ExcelExportComponent implements OnInit {
  memberCount: number = 0;
  allMembers: Member[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dayService: DayInfoHolderService,
    private memberService: MemberInfoHolderService,
    private sessionService: SessionHolderService) {
  }

  ngOnInit() {
    // Update te component for the first time
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.allMembers = this.memberService.members;

        if (this.allMembers.length === 0 || typeof this.allMembers === "undefined") {
          this.router.navigateByUrl('home');
        }
        // Reset search index values
        // this forces refresh of internal
        // member lists
        this.lastSearchedDayIndex = -1;
        this.lastSearchedShiftIndex = -1;
      }
    });
  }

  export(): void {
    this.exportWorkbook();
  }

  getCommittees(): string[] { return Committee.getAll(); }

  shiftMembers: Member[];
  dayMembers: Member[];
  lastSearchedDayIndex: number = -1;
  lastSearchedShiftIndex: number = -1;

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: string): Member[] {

    if (dayIndex !== this.lastSearchedDayIndex) {
      /**
       * Cache the selected members of this day
       */
      this.dayMembers = Filters.selectedInDay(this.allMembers, dayIndex);
      this.lastSearchedDayIndex = dayIndex;
    }

    if (shiftIndex !== this.lastSearchedShiftIndex) {
      /**
       * Cache the members of the shift
       */
      this.shiftMembers = Filters.selectedInShift(this.dayMembers, dayIndex, shiftIndex);
      this.lastSearchedShiftIndex = shiftIndex;
    }

    // Shift has no assigned members
    if (typeof this.shiftMembers === "undefined") return [];

    let commMembers = this.shiftMembers.filter(m => m.getAssignmentAt(dayIndex, shiftIndex).committee === committeeName);

    // This committee has noone assigned
    if (typeof commMembers === "undefined") return [];
    return commMembers;
  }

  /**
   * Used for iteration with ngFor
   */
  getEventDaysDetails(): number[] {
    return this.dayService.dayShifts;
  }



  /**
   * Used for iteration with ngFor
   */
  getEventShiftsOfDay(dayIndex: number): number[] {
    return Array(this.dayService.dayShifts[dayIndex]).fill(0);
  }

  /**
   * export the workbook into a csv files
   * file for each day
   */
  exportWorkbook(): void {
    let self = this;
    // for each day generate csv file and download it
    this.getEventDaysDetails().forEach(function (value, index) {
      let fileName = "event-day-" + (index + 1) + "-value-" + index;
      let csv = self.getCSV(index);
      saveAs(new Blob([self.s2ab(csv)], { type: "application/octet-stream" }), fileName + ".csv");
    })
  }

  s2ab(s): ArrayBuffer {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  getCSV(dayIndex: number): string {

    // initial value is the placeholder for the committee
    let csv = "Committee,";

    /**
     * The header of the csv file make new header for every day 
     * to allow different shift numbers
     */
    let header = "";
    let numOfShifts = this.getEventShiftsOfDay(dayIndex).length;
    for (let i = 0; i < numOfShifts; i++) {
      header += "Shift " + (i + 1) + ",";
    }
    header = header.slice(0, -1); // slice the last ','
    csv += header; // add the header to the csv file 

    // to satisfy the kings of js and their weird scope religion 
    let self = this;

    // used for adding empty line at end of each committee
    let shiftNum = self.getEventShiftsOfDay(dayIndex).length; 

    this.getCommittees().forEach(function (committeName, _) {

      // get the line count and number of members for this committe
      // for each shift
      let lineCount = 0;
      let shiftMemberCount: number[] = [];
      let shiftMembersArrays: Member[][] = [];

      
      self.getEventShiftsOfDay(dayIndex).forEach(function (_, shiftIndex) {
        shiftMembersArrays[shiftIndex] = self.getAssignedCommitteeMembers(dayIndex, shiftIndex, committeName);
        shiftMemberCount[shiftIndex] = shiftMembersArrays[shiftIndex].length;
        if (shiftMemberCount[shiftIndex] > lineCount)
          lineCount = shiftMemberCount[shiftIndex];
      })

      for (let i = 0; i < lineCount; i++) {
        // Add the committe name if this is the first line
        // else leave the value empty
        csv += "\n";
        if (!i) {
          csv += committeName + ",";
        } else {
          csv += ",";
        }

        // iterate over shiftMembersArrays each is array of member - hence the name -
        shiftMembersArrays.forEach(shiftMemberArray => {
          // if shift has member at line i add it else leave empty (',')
          if (shiftMemberArray[i] !== undefined) {
            csv += shiftMemberArray[i].name + ",";
          } else {
            csv += ",";
          }
        })
      }
      
      // adding empty line at the end of the committe members if 
      // there's members in this committe for this day
      if (lineCount) {
        csv += "\n";
        for(let i = 0; i <= numOfShifts; i++) { 
          csv += ","; 
        }
        csv += "\n";
      }
    });

    
    csv += this.getSessionCSV(dayIndex);
    
    return csv;
  }

   getSessionCSV(dayIndex: number) : string {
    let sessionsCSV = "\n \nSessions, \n";
    let daySessions = this.sessionService.getDaySessions(dayIndex);
    
    if (!daySessions) return sessionsCSV;
    
    let sessionsCount = daySessions.length;
    
    let header = ",Public Relations,Reporting and Publications \n"
    let body = "";

    for (let i = 0; i < sessionsCount; i++) {
      body += daySessions[i].name + " (" + this.getTimeFormatted(daySessions[i].startDate) + " - " + 
      this.getTimeFormatted(daySessions[i].endDate) + ")";
      body += "," + daySessions[i].publicRelationsMember.name + "," +
        daySessions[i].reportingMember.name + "\n";
    }

    sessionsCSV += header;
    sessionsCSV += body;

    return sessionsCSV;
  }

  getTimeFormatted(date: Date): string {
    let hours = date.getHours();
    let hoursString = hours.toString();
    if (hours < 10) hoursString = "0" + hoursString;
    let minutes = date.getMinutes();
    let minutesString = minutes.toString();
    if (minutes < 10) minutesString = "0" + minutesString;
    return hoursString + ":" + minutesString;
  }

}
