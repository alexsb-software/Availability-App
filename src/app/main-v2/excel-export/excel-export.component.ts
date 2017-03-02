import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../app-services/member-holder.service';
import { Member } from '../logic/member';
import { Committee } from '../logic/committee';
import { Filters } from '../logic/filters';
import { saveAs } from 'file-saver';
import * as XLSX from 'ts-xlsx';
import {Md5} from 'ts-md5/dist/md5';



// const {Cu} = require("chrome");
// To read & write content to file
// const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});


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
    private memberService: MemberHolderService) {
  }

  ngOnInit() {
    // Update te component for the first time
    this.router.events.subscribe(e => {
      console.debug("Router ", e);
      if (e instanceof NavigationEnd) {
        this.allMembers = this.memberService.members;

        // Reset search index values
        // this forces refresh of internal
        // member lists
        this.lastSearchedDayIndex = -1;
        this.lastSearchedShiftIndex = -1;

        if (typeof this.allMembers === "undefined") throw Error("No members are present");
      }
      /**
       * event emiiteer reload memebrs
       */
    });
    
    this.exportWorkbook();

    // this.memberService.memberAssignmentChanged.subscribe(() => {
    //   console.debug("Members changed");
    // });

  }

  getCommittees(): string[] { return Committee.getAll(); }

  shiftMembers: Member[];
  dayMembers: Member[];
  lastSearchedDayIndex: number = -1;
  lastSearchedShiftIndex: number = -1;

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: string): Member[] {

    if (dayIndex !== this.lastSearchedDayIndex) {
      /**
       * Cache the slected members of this day
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
    return this.memberService.days;
  }



  /**
   * Used for iteration with ngFor
   */
  getEventShiftsOfDay(dayIndex: number): number[] {
    return Array(this.memberService.days[dayIndex]).fill(0);
  }

  /**
   * export the workbook into a csv files
   * file for each day
   */
  exportWorkbook(): void {

    let self = this;
    this.getEventDaysDetails().forEach(function(value, index) {
      let fileName = "event-day-" + value + "-index-" + index;
//      let csv = self.getCSV(index);
      let csv = fileName;
      saveAs(new Blob([self.s2ab(csv)],{type:"application/octet-stream"}), fileName + ".csv");
      // TODO 
    })

    let workbook = 'test.xlsx'; // TODO change this to the workbook to be exported
    
    let wopts = { bookType:'csv', bookSST:false, type:'binary' };
    let wbout = XLSX.write(workbook,wopts);
    // console.debug("Hello", wopts);

  }

  s2ab(s): ArrayBuffer {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
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
      header += "Shift " + i + ",";
    }
    header = header.slice(0, -1); // slice the last ','
    csv += header; // add the header to the csv file 

    // to satisfy the kings of js and their weird scope religion 
    let self = this;

    this.getCommittees().forEach(function(committeName, _) {

      // add new line and the committe name for the new record 
      self.getEventShiftsOfDay(dayIndex).forEach(function(_, index) {
        csv += '\n ';
        let first = true;
        self.getAssignedCommitteeMembers(dayIndex, index, committeName).forEach(member => {
          // to avoid writing the name of committee for each member
          if (first) {
            csv += committeName + ", ";
            first = !first;
          } else {
            csv += ',';
          }

          csv += member.name + ', ';
        })
      })
    });  
    console.debug(csv);

    // let encoder = new TextEncoder();                                   // This encoder can be reused for several writes
    // let array = encoder.encode(csv);                   // Convert the text to an array
    // let promise = OS.File.writeAtomic("file.txt", array,               // Write the array atomically to "file.txt", using as temporary
    // {tmpPath: "file.txt.tmp"}); 
    return csv;
  }

}
