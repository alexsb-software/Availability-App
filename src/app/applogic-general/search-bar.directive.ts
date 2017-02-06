import { Directive, Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';
 //import {CORE_DIRECTIVES} from '@angular/common';  
import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[searchBar]',
})
export class SearchBarDirective {
  /**
   * This is a directive class, to know more about directives, visit
   * https://angular.io/docs/ts/latest/guide/attribute-directives.html
   */
  @Input() timeout: number = 200;

  @Output() onKeyInputStop: EventEmitter<string> = new EventEmitter<string>();
  searchString: string;
  timer: NodeJS.Timer;

  constructor(private elementRef: ElementRef) {
    

    const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.searchString)
      .debounceTime(this.timeout)
      .distinctUntilChanged();
    eventStream.subscribe(input => this.onKeyInputStop.emit(input));
  }

  // @HostListener('keyup') onKey(e: KeyboardEvent) {

  //   if (this.timer != null)
  //     clearTimeout(this.timer);

  //   this.timer = setTimeout(
  //     () => this.onKeyInputStop.emit(this.el.nativeElement.value), this.timeout);
  // }

}
