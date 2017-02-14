import { CommitteeEnum, Committee } from './committee';
fdescribe('CommitteEnumMapping', () => {
    let commEnum: CommitteeEnum = CommitteeEnum.Activities;
    fit('should convert the enum to a commitee name, single word', () => {

        let name: string = Committee.getCommittee(commEnum);
        expect(name).toEqual("Activities");
    })
});