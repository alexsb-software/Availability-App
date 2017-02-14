import { Pipe, PipeTransform } from '@angular/core';
import { Committee, CommitteeEnum } from './committee';
@Pipe({
  name: 'removePrRnp'
})
export class RemovePrRnpPipe implements PipeTransform {

  transform(commNames: string[], args?: any): string[] {
    let reportings = Committee.getCommittee(CommitteeEnum.Reportings);
    let publicRel = Committee.getCommittee(CommitteeEnum.PublicRelations);
    let result: string[] = [];
    // Select all that are not reportings or pr
    result = commNames.filter(m => m !== reportings && m !== publicRel);
    return result;
  }

}
