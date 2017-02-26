import { Component, OnInit } from '@angular/core';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { utils, IWorkBook, IWorkSheet, IWorkSheetCell, IUtils } from 'ts-xlsx';
import * as XLSX from 'ts-xlsx';
import { Member } from '../logic/member';

@Component({
  selector: 'v2-excel-parser',
  templateUrl: './excel-parser.component.html',
  styleUrls: ['./excel-parser.component.css']
})
export class ExcelParserComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();

  workSheetContent: string[][] = [];
  loading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem: any) => {

      this.reader.onload = (e: any) => {
        // Run async
        // this.loading = true
        let workbook: IWorkBook;
        let arr = this.fixdata(e.target.result);
        workbook = XLSX.read(btoa(arr), { type: 'base64' });
        this.parseFile(workbook);
      };

      this.reader.readAsArrayBuffer(fileItem._file);
    };
  }

  parseContent(): void {
    for (let row in this.workSheetContent) {
      
    }
  }
  

  parseFile(workbook: IWorkBook): void {

    this.workSheetContent = this.convertTo2dArray(workbook);

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
            memberInfo.shifts.push(this.parseShiftStr(shiftStr.trim()));
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
      //this.workSheetContent = contentBuff;  // For printing content
    });
  }

  convertTo2dArray(workbook: IWorkBook): string[][] {

    let responses: IWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    let result: string[][] = [];
    let content: any = XLSX.utils.sheet_to_json(responses, { header: 1 });

    for (let i: number = 0; content[i].length !== 0; i++) {
      result.push(content[i]);
    }

    return result;
  }

  // I care for this shift number only for now
  parseShiftStr(shiftRaw: string): number {
    // shifts are on this form
    // Shift 1 [1:00 PM - 3:30 PM]
    //let regex: RegExp = new RegExp(`\d:\d+\s[[PM]`);

    let parts: string[] = shiftRaw.split(' ');
    return parseInt(parts[1]) - 1;
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

