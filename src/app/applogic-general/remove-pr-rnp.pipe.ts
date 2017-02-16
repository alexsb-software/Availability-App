import { Pipe, PipeTransform } from '@angular/core';
import { Committee, CommitteeEnum } from './committee';
@Pipe({
  name: 'removePrRnp'
})
export class RemovePrRnpPipe implements PipeTransform {

  transform(commNames: string[], args?: any): string[] {
    let reportings = Committee.getCommittee(CommitteeEnum.Reporting);
    let publicRel = Committee.getCommittee(CommitteeEnum.PublicRelations);
    
    let result: string[] = [];
    
    // Select all that are not reportings or pr,
    // don't use foreach and match with committee names as we just
    // want to execulde some given data, using committee names
    // means that we take an amount of data, which might not
    // match the form
    for (let comm of commNames) {
      
      if (comm === reportings || comm === publicRel) {
        continue;
      }
      result.push(comm);
    }
    return result;
  }

}
