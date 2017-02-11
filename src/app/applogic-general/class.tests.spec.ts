import { CommiteeEnum, Committee } from './committee';
fdescribe('CommitteEnumMapping', () => {
    let commEnum: CommiteeEnum = CommiteeEnum.Activities;
    fit('should convert the enum to a commitee name, single word', () => {

        let name: string = Committee.getCommittee(commEnum);
        expect(name).toEqual("Activities");
    })
});