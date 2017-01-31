import { TimeOfDay } from './time-of-day.enum';
export class ShortTimeDate {
    hours: number;
    minutes: number;
    timeOfDay: TimeOfDay;

    public static toString(val:ShortTimeDate): string {
        let result = String(val.hours) +
            ":" + String(val.minutes) + " "
            + (val.timeOfDay == TimeOfDay.AM ? "AM" : "PM");
        return result;
    }
}
