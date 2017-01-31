/*
    This interface is used when the avalability is submited 
    to the backend server.
 */
export interface UserAvalability{
    eventId: number;
    userId: number;
    avalHash: Array<Array<Boolean>>;
}