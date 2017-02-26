import { Component, PipeTransform, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnChanges {
  // TODO create an event object to hold number and object
  @Output() itemClicked: EventEmitter<ArrayItemEventArgs> = new EventEmitter<any>();
  @Output() itemRemoved: EventEmitter<ArrayItemEventArgs> = new EventEmitter<any>();
  /**
   * Items to be displayed in the table
   */
  @Input() items: any[];

  /**
   * Properties to be displayed in the given objects
   * in the array
   */
  @Input() properties: string[];

  /**
   * Names to use as table head to display properties
   */
  @Input() propertyDisplayNames: string[];

  /**
   * Optional pipe incase you want to transform 
   * element display
   */
  @Input() pipe: PipeTransform;
  /**
   * Arguments for the given pipe
   */
  @Input() pipeArgs: any[];
  /**
   * Array of flags to inform the component that you
   * want to transform the property of index [x]
   * in the provided properties
   */
  @Input() applyPipeProps: number[];

  /**
   * Make the event fire when a table item is clicked
   */
  @Input() enableClickCallback: boolean = false;
  /**
   * Indicates whether you can remove the array items
   */
  @Input() canRemove: boolean = true;
  /**
   * Show the index of the items when printed in table
   */
  @Input() showIndex: boolean = true;

  /**
   * Wheteher to show a message indicating that the table is empty
   */
  @Input() showEmptyMessage: boolean = false;

  ngOnChanges(changes: SimpleChanges) {

    /**
     * Check only for the existence of the array,
     * don't check for its length because it might just
     * be empty now
     */
    if (!this.items) {
      throw new EvalError("[ng2-dynamic-table] No items are provided");
    }

    // changes.prop contains the old and the new value...
    //console.debug("Changes");
    //console.log(changes);
    if (this.properties && this.propertyDisplayNames) {
      if (this.properties.length != this.propertyDisplayNames.length) {
        throw new EvalError("[ng2-dynamic-table] Number of element in property display names isn't equal to number of properties");
      }
    }
    // Multiple properties and a pipe
    // An array of flags must be propvided to transform
    // according to it
    if (this.pipe && this.properties) {

      /**
       * If applyPipeProps is provided, then the user
       * wants to transform some properties and not
       * the other.
       * 
       * If the lengths are not equal, throw an error
       */
      if (!this.applyPipeProps || (this.applyPipeProps.length != this.properties.length)) {
        throw new EvalError("[ng2-dynamic-table]:applyPipeProps length must be equal to the" +
          " length of properties provided since you're using" +
          " a pipe and multiple properties to display");
      }

      /**
       * The user didn't provide applyPipeProps
       * We assmue that they want to transform all
       * the provided properties.
       */

      // /**
      //  * Deep binding
      //  */
      // for (let i: number = 0; i < this.properties.length; i++) {
      //   // No '.' found
      //   if (this.properties[i].indexOf('.') === -1) continue;

      //   // This is a complex property

      // }
    }
  }

  constructor() {

  }

  /**
   * Resolves the dot notation access of properties
   * to hash table property access:
   * val.subObj.prop -> val[""]
   */
  private deepParse(complexProp: string): string {
    let dotIdx: number = complexProp.indexOf('.');

    // Base case
    if (dotIdx === -1)
      return complexProp;

    // Solve part of the problem. evaluate the dot
    // notation to an hashtable access [<propname>]

    /**
     * TODOthis.
     */

  }

  callback(obj: any, index: number): void {
    if (!this.enableClickCallback) return;

    this.itemClicked.emit(new ArrayItemEventArgs(obj, index));
  }

  removeItem(obj: any, index: number): void {
    if (!this.canRemove) return;
    this.itemRemoved.emit(new ArrayItemEventArgs(obj, index));
  }

  public eval(item: any, prop: string) {
    // Concat object and its property with dot notation
    // then find this value using eval -- this is a bad practice
    // it'll stay here until a better solution is found
    
    // console.log("item" + "." + prop);
    return eval("item" + "." + prop);
  }

/**
 * TODO display a certain amount of rows then show scrollbar
 */

}

/**
 * ArrayItemEventArgs This object is emitted whenver an
 * interesrting event happens to a table's item
 * 
 * It holds the element and its index
 * in the bound array,
 */
export class ArrayItemEventArgs {

  object: any;
  index: number;
  constructor(object: any, index: number) {
    this.object = object;
    this.index = index;
  }
}
// Add some interface for item removed, pipes, and so on