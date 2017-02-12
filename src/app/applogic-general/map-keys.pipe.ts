import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from './member-availability';
import { Member } from './member';

@Pipe({
  name: 'mapKeys'
})
export class MapKeysPipe implements PipeTransform {

  transform(value: Map<string, MemberAvailability[]>): string[] {
    let keyArray = [];

    value.forEach((v, k) => {
      keyArray.push(k);
    });
    return keyArray;
  }

}
