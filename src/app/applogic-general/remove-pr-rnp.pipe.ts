import { Pipe, PipeTransform } from '@angular/core';
import { Committee, CommitteeEnum } from './committee';
@Pipe({
  name: 'removePrRnp'
})
export class RemovePrRnpPipe implements PipeTransform {

  transform(commNames: string[], args?: any): string[] {
    let reportings = Committee.getCommittee(CommitteeEnum.Reporting);
    let publicRel = Committee.getCommittee(CommitteeEnum.PublicRelations);
    console.log("Reporting:" + reportings);
    console.log("Public Rel:" + publicRel)
    let result: string[] = [];
    // Select all that are not reportings or pr
    console.log(commNames);
    for (let comm of commNames) {
      console.log("Inspect" + comm);
      if (comm === reportings || comm === publicRel) {
        console.log("comm === reportings:" + comm === reportings);
        console.log("comm === publicRel:" + comm === publicRel);
        continue;
      }
      console.log("Push:" + comm);
      result.push(comm);
    }
    console.log(result);
    return result;
  }

}
