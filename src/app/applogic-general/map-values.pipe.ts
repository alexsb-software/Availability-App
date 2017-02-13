import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValues'
})
export class MapValuesPipe<K, V> implements PipeTransform {

  transform(value: Map<K, V>): V[] {
    let valueArray: V[] = [];

    value.forEach((v, k) => {
      valueArray.push(v);
    });
    return valueArray;
  }
}
