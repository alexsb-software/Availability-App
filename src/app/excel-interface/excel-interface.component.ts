import { Component, OnInit } from '@angular/core';
//import * as XLSX from './xlsx';
import * as XLSX from 'ts-xlsx';
import { utils, IWorkBook, IWorkSheet, IWorkSheetCell, IUtils } from 'ts-xlsx';
import { EventShift } from '../applogic-general/event-shift';
import { Member } from '../applogic-general/member';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import 'rxjs/Rx' ;
import { StateSaverService } from '../singleton-services/state-saver.service';
import { saveAs } from 'file-saver';


// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-excel-interface',
  templateUrl: './excel-interface.component.html',
  styleUrls: ['./excel-interface.component.css'],
})
export class ExcelInterfaceComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();

  workSheetContent: string[] = [];
  rABS: boolean = false; // true: readAsBinaryString ; false: readAsArrayBuffer

  constructor(private stateHolder: StateSaverService) {

  }

  /* processing array buffers, only required for readAsArrayBuffer */
  fixdata(data): string {
    let o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      //this.reader.readAsText(fileItem._file);
      //console.log("Read")
      this.reader.onload = (e: any) => {
        //console.log(e.target.result);
        let data = e.target.result;

        let workbook: IWorkBook;
        if (this.rABS) {
          /* if binary string, read with type 'binary' */
          workbook = XLSX.read(data, { type: 'binary' });
        } else {
          /* if array buffer, convert to base64 */
          let arr = this.fixdata(data);
          workbook = XLSX.read(btoa(arr), { type: 'base64' });
        }
        // console.log("Printing workbook")
        // console.log(workbook);
        this.parseFile(workbook);

      };
      if (this.rABS) this.reader.readAsBinaryString(fileItem._file);
      else this.reader.readAsArrayBuffer(fileItem._file);

    };

  }
  parseFile(workbook: IWorkBook): void {

    let sheetList: string[] = workbook.SheetNames;
    sheetList.forEach((sheetName) => {

      let worksheet: IWorkSheet = workbook.Sheets[sheetName];
      let contentBuff: string[] = [];
      let memberInfos: MemberLine[] = [];
      let memberInfo: MemberLine = null;
      let shiftCount: Number = 0;

      for (let cell in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if (cell[0] === '!') continue;

        if (cell.startsWith('A')) {

          memberInfo = new MemberLine();
          continue;
        }

        let cellContent: string = worksheet[cell].v;
        //console.log(cellContent);

        if (cell.startsWith('B')) {
          memberInfo.member = new Member();
          memberInfo.member.name = cellContent;

        }
        else if (cell.startsWith('C')) {
          // committees

          cellContent.split(',').forEach(str => {
            let trimmed: string = str.trim();
            //let commRaw: string = trimmed.split(' ')[0];
            //console.log(commRaw);
            //let committee: Committee = Committee.getCommittee(commRaw);
            memberInfo.committees.push(trimmed);
          });
        }
        else if (cell.startsWith('D')) {
          let shiftCountInRow = 0;
          // Shifts on the form shName[start-end]
          cellContent.split(',').forEach(shiftStr => {
            let shift: EventShift = this.parseShiftStr(shiftStr.trim());
            memberInfo.shifts.push(shift.number);
            shiftCountInRow++;
          });

          // Track the count of shifts
          if (shiftCountInRow > shiftCount) {
            shiftCount = shiftCountInRow;
          }

          // This is added here because if it's added above,
          // the last cell doesn't get added as the loop
          // breaks before reching the line
          memberInfos.push(memberInfo);
          contentBuff.push(memberInfo.toString());
        }
      }
      
      // Parsing finished
      this.stateHolder.save("excel", memberInfos);
      this.workSheetContent = contentBuff;  // For printing content
    });
  }

  // I care for this shift number only for now
  parseShiftStr(shiftRaw: string): EventShift {
    // shifts are on this form
    // Shift 1 [1:00 PM - 3:30 PM]
    //let regex: RegExp = new RegExp(`\d:\d+\s[[PM]`);

    let parts: string[] = shiftRaw.split(' ');
    let result: EventShift = new EventShift();
    result.number = parseInt(parts[1]) - 1;
    return result;
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