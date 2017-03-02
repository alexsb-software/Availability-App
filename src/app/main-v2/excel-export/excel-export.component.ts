import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MemberHolderService } from '../app-services/member-holder.service';
import { Member } from '../logic/member';
import { Committee } from '../logic/committee';
import { Filters } from '../logic/filters';
import { saveAs } from 'file-saver';
import * as XLSX from 'ts-xlsx';



@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styles: []
})
export class ExcelExportComponent implements OnInit {
  memberCount: number = 0;
  eventInfo: Map<string, Member[]>[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MemberHolderService) {
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.eventInfo = this.memberService.prettyFormat();
      }
    });
  }

  getCommittees(): string[] { return Committee.getAll(); }

  getAssignedCommitteeMembers(dayIndex: number, shiftIndex: number, committeeName: number): Member[] {
    return [];
    //return this.eventInfo[0].get();
  }

  getDaysAsIterable(): number[] {
    /**
     * Creates an array to be used with ngFor
     * based on the number of days in the event
     */
    let dayCount: number = this.memberService.getDayCount()
    return Array(dayCount).fill(0);
  }

  exportWorkbook(): void {
    let workbook = 'test.xlsx'; // TODO change this to the workbook to be exported
    
    let wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    let wbout = XLSX.write(workbook,wopts);
    console.debug("Hello", wopts);
    saveAs(new Blob([this.s2ab(workbook)],{type:"application/octet-stream"}), "test.xlsx");

  }

  s2ab(s): ArrayBuffer {

    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    
    return buf;

  }

}
