import { Injectable } from '@angular/core';
import { Member } from '../logic/member';

@Injectable()
export class MemberHolderService {
  public members: Member[] = [];
}
