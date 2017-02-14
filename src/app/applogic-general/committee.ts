
/**
 * Holds the committee names in an array that's 
 * alphabetically sorted. sorting is there to
 * make index access easier for the software 
 * engineer who will be using the code
 * 
 * A better approach is to obtain that data
 * from the server and act upon it. you can
 * clear all the elements inside the array 
 * and add whatever info you want
 * 
 * The array is chosen -not an enum- to provide adding more 
 * elements at runtime and being bound by the 
 * existing committees of the day of creating 
 * this code (5 Februray, 2017)
 * 
 * Update: An enum is provided for the main committees
 * now, the Committee class MUST be compatible with enum/string usage
 */
export class Committee {

    public static insertCommittee(com: string): void {
        // Cehck if this item already existed
        if (Committee.committees.indexOf(com) != -1)
            return;

        // Add it
        Committee.committees.push(com);

        // Keep the array sorted
        Committee.committees.sort();
    }

    /**
     * Public interface to find a committee
     * 
     * The weird syntax is to provide function
     * overloads
     */
    public static getCommittee(key: number | string | CommitteeEnum): string {
        if (typeof key === "number") {
            return Committee.getCommByIndex(key);
        }
        if (typeof key === "CommitteeEnum") {
            return Committee.getCommByEnum(key);
        }
        return Committee.getCommByKeyword(key);
    }

    /**
     * Finds a committee by index
     */
    private static getCommByIndex(idx: number): string {
        // Cehck array bounds
        if (idx >= Committee.committees.length)
            throw new Error("Committee array is smaller than the requested index");

        // Get the value
        return Committee.committees[idx];
    }

    private static getCommByEnum(key: CommitteeEnum): string {
        // if committee name is 2 words, just use the first word
        let firstWord: string = CommitteeEnum[key].split(" ")[0]
        return Committee.getCommByKeyword(firstWord);
    }

    /**
     * Finds a committee by a search string
     */
    private static getCommByKeyword(key: string): string {
        let result: string = Committee.committees.find(s =>
            s.toLowerCase().includes(key.toLocaleLowerCase()));

        if (result) return result;
        throw new Error("Committee not found");
    }

    /**
     * Returns all the Committees
     */
    public static getAll(): string[] {
        return Object.assign(Committee.committees);
    }

    public static clearAll(): void {
        Committee.committees = [];
    }

    public static commLength(): number {
        return Committee.committees.length;
    }

    private static committees: string[] =
    [
        "Activities",
        "Graphics",
        "Human Resources",
        "Logistics",
        "Marketing",
        "Operations",
        "Public Relations",
        "Presrenters",
        "Registration",
        "Reportings and Publications",
        "Software",
    ];
}

export enum CommitteeEnum {
    Activities = 0,
    Graphics,
    HumanResources,
    Logistics,
    Marketing,
    Operations,
    PublicRelations,
    Presenters,
    Registration,
    Reportings,
    Software

}