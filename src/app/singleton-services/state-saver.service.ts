import { Injectable } from '@angular/core';

@Injectable()
export class StateSaverService {
  private states: Map<string, any> = new Map<string, any>();
  constructor() { }
  save(key: string, object: any) {
    this.states.set(key, object);
  }
  get(key: string): any {
    return this.states.get(key);
  }
  exists(key: string): boolean {
    return this.states.has(key);
  }
  delete(key: string): void {
    if (!this.exists(key)) return;
    this.states.delete(key);
  }
}
