export class Member {
    name: string;
    committee: Committee;
    id?: number; // For sending to db
}

export enum Committee {
    Registration,
    Marketing,
    Graphics,
    Software,
    HumanResources,
    ReportingTeam,
    PublicRelations,
    Activities
}
