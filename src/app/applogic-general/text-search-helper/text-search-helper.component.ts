import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-search',
  templateUrl: './text-search-helper.component.html',
  styleUrls: ['./text-search-helper.component.css']
})
export class TextSearchHelperComponent {
  @Input() placeholder = "";
  @Output() searchRequest: EventEmitter<string> = new EventEmitter<string>();
  searchString: string;

  constructor() { }

  search(): void {
    this.searchRequest.emit(this.searchString);
  }

  onKey(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === "Backspace" || e.key === "Delete") {
      this.searchRequest.emit(this.searchString);
    }
  }

}
