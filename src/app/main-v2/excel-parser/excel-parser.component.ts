import { Component, OnInit } from '@angular/core';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { utils, IWorkBook, IWorkSheet, IWorkSheetCell, IUtils } from 'ts-xlsx';
import { Member } from '../logic/member';
import { Committee } from '../logic/committee';
import { DayInfoHolderService } from '../app-services/day-info-holder.service';
import { MemberInfoHolderService } from '../app-services/member-info-holder.service';


import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'v2-excel-parser',
  templateUrl: './excel-parser.component.html',
  styleUrls: ['./excel-parser.component.css']
})
export class ExcelParserComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();

  workSheetContent: any[] = [];
  loading: boolean = false;
  dayCount: number = 0; // Bind this with an ngFor to get shifts/day
  members: Member[] = [];
  dayShifts: number[] = [];

  constructor(private dayService: DayInfoHolderService,
    private memberService: MemberInfoHolderService) { }

  ngOnInit() {
    this.setHandler();
    this.dayShifts = Array(this.dayCount).fill(1);
  }
  changeDayCount(amount: number) {
    if (this.dayCount + amount < 0) return;

    if (amount > 0) {
      let initialShiftCount: number = 1;
      // Add last entry
      this.dayService.setShiftCount(this.dayCount, initialShiftCount);
      this.dayCount += amount;  // Update the count

      this.dayShifts.push(initialShiftCount);
    }
    else if (amount < 0) {
      // Remove the last entry in the hash table
      this.dayService.removeDay(this.dayCount - 1);
      this.dayCount += amount;

      this.dayShifts.pop();
    }
  }
  changeShiftCount(dayIndex: number, amount: number): void {
    /**
     * Binding an input to ngModel dayShifts[i] didn't work correctly
     * 
     * Shifts can't be less than one
     */
    if (this.dayShifts[dayIndex] + amount < 1) return;

    this.dayShifts[dayIndex] += amount;
    this.dayService.setShiftCount(dayIndex, this.dayShifts[dayIndex]);
  }

  private setHandler() {
    // Template code
    // TODO make this reusable
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.reader.onload = (e: any) => {
        let arr = this.fixdata(e.target.result);
        this.parseContent(XLSX.read(btoa(arr), { type: 'base64' }));
      };
      this.reader.readAsArrayBuffer(fileItem._file);
    };

  }

  parseContent(workbook: IWorkBook): void {
    this.workSheetContent = this.convertTo2dArray(workbook);
    let mems: Member[] = [];
    let committees: Set<string> = new Set<string>();

    for (let row of this.workSheetContent) {
      let member = new Member();
      // TODO 0 contains time stamp
      // Row row[1] (col with index 1) contains the name
      member.name = row[1];
      member.committees = row[2].split(',').map(s => s.trim());

      // Get data about all available committess
      // This collection will contain all the available committees,
      // instead of creating a custom entry or defining them manually
      member.committees.forEach(c => committees.add((<string>c).trim()));

      // Each day column contains the member available shifts in a day
      for (let i: number = 0; i < this.dayCount; i++) {
        let shiftString: string = row[3 + i];

        if (typeof shiftString === "undefined") {
          // Add en empty array to avoid the hussle of using
          // a hash table for the day-shift
          member.shifts.push([]);
          continue;
        }

        let shifts: number[] = this.parseShifts(shiftString);
        member.shifts.push(shifts); // Parse all shifts for this day

      }

      mems.push(member);
    }

    // Save the data to the global state
    committees.forEach(c => Committee.insertCommittee(c));
    this.memberService.members = mems;

    this.members = mems;
  }

  parseShifts(allShifts: string): number[] {
    let shifts: number[] = [];

    allShifts.split(',').forEach(item => {
      let parts: string[] = item.trim().split(' ');

      //Shift 1 [1:00 PM - 3:00 PM], Shift 2 [3:00 PM - 5:00 PM]
      shifts.push(parseInt(parts[1]) - 1);
    });
    return shifts;
  }

  convertTo2dArray(workbook: IWorkBook): any[] {

    let responses: IWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    let result: any[] = [];
    let content: any = XLSX.utils.sheet_to_json(responses, { header: 1 });

    for (let i: number = 0; true; i++) {
      //console.debug(content[i]);
      result.push(content[i]);

      if (typeof content[i + 1] === "undefined") break;
      if (content[i + 1].length === 0) break;
    }

    return result;
  }

  // Required for XSLX
  fixdata(data): string {
    let o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }
}


export class MemberLine {
  member: Member;
  shifts: number[] = [];
  committees: string[] = [];

  toString(): string {
    return this.member.name + " " + this.shifts + " " + this.committees;
  }
}
