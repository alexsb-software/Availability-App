import { Injectable } from '@angular/core';

import { FilterService } from '../app-services/filter.service';
import { CommitteeService } from '../app-services/committee.service';

@Injectable()
export class DayInfoHolderService {
  //public members: Member[] = [];
  /**
   * Holds the day
   */
  private dayShiftsTable: Map<number, number> = new Map<number, number>();

  public currentDayIndex: number;
  public currentShiftIndex: number;

  private get getDayShifts(): Map<number, number> {
    return Object.assign(this.dayShiftsTable);
  }

  public get dayShifts(): number[] {
    let dayInfo: number[] = [];
    this.dayShiftsTable.forEach((shiftCount, dayIndex) => dayInfo.push(shiftCount));
    return dayInfo;
  }

  public getDayCount(): number {
    let count: number = 0;
    this.getDayShifts.forEach(k => count++);
    return count;
  }

  public setShiftCount(dayIndex: any, shiftCount: number): void {
    dayIndex = parseInt(dayIndex);
    this.dayShiftsTable.set(dayIndex, shiftCount);
  }

  public getShiftCount(dayIndex: any): number {
    dayIndex = parseInt(dayIndex);
    if (!this.dayShiftsTable.has(dayIndex))
      throw new Error("Key not found '" + dayIndex + "'");

    return this.dayShiftsTable.get(dayIndex);
  }

  public removeDay(dayIndex: any): void {
    dayIndex = parseInt(dayIndex);
    this.dayShiftsTable.delete(dayIndex);
  }

  getNumberAsIterable(num: number): number[] {
    /**
     * Used for HTML ngFor Generation
     * 
     * Creates an array of a given number and fills it
     * with each element's index
     */

    let result: number[] = Array(num).fill(0);
    result.forEach((val, index) => result[index] = index);
    return result;
  }

  public mapToObject(): Object {
    return Array.from(this.dayShiftsTable).reduce((obj, [key, value]) => {
      obj[key] = value; // Be careful! ES6 Maps may have non-String keys.
      return obj;
    }, {});
  }

  public objectToMap(obj: any): void {
    let self = this;
    this.objectToArray(obj).forEach(function (element) {
      let dayIndex: number = element[0], shiftCount: number = element[1];
      self.setShiftCount(dayIndex, shiftCount);
    });
  }

  private objectToArray(obj): any[][] {
    return Object.keys(obj).map(key => {
      const value = obj[key];
      return [key, value];
    });
  }
}
