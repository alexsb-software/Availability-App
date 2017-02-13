import { Pipe, PipeTransform } from '@angular/core';
import { MemberAvailability } from './member-availability';
import { Member } from './member';

@Pipe({
  name: 'mapKeys'
})
export class MapKeysPipe<K, V> implements PipeTransform {

  transform(value: Map<K, V>): K[] {
    let keyArray: K[] = [];

    value.forEach((v, k) => {
      keyArray.push(k);
    });
    return keyArray;
  }

}
