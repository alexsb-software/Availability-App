import { Injectable } from '@angular/core';
import { Member } from '../logic/member';

@Injectable()
export class MemberInfoHolderService {

  constructor() { }
  private _members: Member[] = [];
  public get members(): Member[] {
    return this._members;
  }
  public set members(v: Member[]) {
    this._members = v;
  }
}
