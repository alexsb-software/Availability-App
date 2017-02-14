import { Component, OnInit } from '@angular/core';
//import * as XLSX from './xlsx';
import * as XLSX from 'ts-xlsx';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-excel-interface',
  templateUrl: './excel-interface.component.html',
  styleUrls: ['./excel-interface.component.css'],
})
export class ExcelInterfaceComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();
  constructor() { }

  ngOnInit() {
    this.reader.onload = (ev: any) => {
      console.log(ev.target.result);
    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.reader.readAsText(fileItem._file);
console.log("Read")
    };
  }

  // upload(input) {
  //   var file = input.files[0];
  //   console.log(file);
  // }
}
