/*
    This interface is used for the UserAvalComponent where the user choose which shift he's available in.
    the avalHash is an 2-D array the first Dimenstion is the num of days the second is the number of 
    shift per day and the value is the avalabilty of the user in the given shift-day
*/

export interface EventUser{
    id: number;
    title: string;
    numOfDays: number;
    numOfShifts: number;
    avalHash: Array<Array<Boolean>>;
}