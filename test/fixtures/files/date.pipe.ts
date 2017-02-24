import { Pipe } from "@angular/core";
import { DateFormatter } from "../util/date-formatter";

@Pipe({})
export class DatePipe {

    dateFormatter = new DateFormatter();

    transform(data, args) {
        this.dateFormatter.formatDate(new Date(), "yyyy/dd/MM");
    }
} 