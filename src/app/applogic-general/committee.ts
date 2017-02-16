
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
        if (Committee.committees.indexOf(com) !== -1)
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
    public static getCommittee(key: CommitteeEnum): string {
        /**
         * Don't use get byIndex, this converts the enum to a number
         * and use it to access the array, which is false
         */
        return Committee.getCommByEnum(key);
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

        // Match with pascal cased words from the enum
        let regexMatchOnKey: RegExpMatchArray = key.match(/([A-Z][a-z0-9]+)/);

        if (!regexMatchOnKey || !regexMatchOnKey.length) {
            // Nothing found
            throw new Error("Committee" + " \"" + key + "\"" + "not found");
        }

        let searchKey: string = regexMatchOnKey[0].toLowerCase();
        let result: string = Committee.committees.find(s =>
            s.toLowerCase().includes(searchKey));

        if (result) return result;
        throw new Error("Committee" + " \"" + key + "\"" + "not found");
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
        // "Activities",
        // "Graphics",
        // "Human Resources",
        "Logistics",
        // "Marketing",
        // "Membership Developement",
        // "Operations",
        // "Public Relations",
        // "Presrenters",
        // "Registration",
        // "Reporting and Publications",
        // "Software Development",
        // "Technical"
    ];
}
/**
 * The shorter the name, the better, as findCommittee uses
 * "includes" function, and names might vary according to the
 * form, so the safe choice is to use small names
 */
export enum CommitteeEnum {
    Activities,
    Graphics,
    HumanResources,
    Logistics,
    Marketing,
    Operations,
    PublicRelations,
    Presenters,
    Registration,
    Reporting,
    Software

}