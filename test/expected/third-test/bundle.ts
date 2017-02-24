import { Pipe } from "@angular/core";
import { DateFormatter } from "../../tmp/util/util-bundle";
import { PasswordValidator } from "../../tmp/lib/validators-bundle";
import { StringValidator } from "../../tmp/lib/validators-bundle";
import { MobileValidator } from "../../tmp/lib/validators-bundle";

@Pipe({})
export class DatePipe {

    dateFormatter = new DateFormatter();

    transform(data, args) {
        this.dateFormatter.formatDate(new Date(), "yyyy/dd/MM");
    }
} 

export class LettersOnlyValidator implements PasswordValidator {

    lettersRegexp: RegExp = /^[A-Za-z]+$/;

    isAcceptable(s: string) {
        return this.lettersRegexp.test(s);
    }
}

export class ZipCodeValidator implements StringValidator {
    
    numberRegexp: RegExp = /^[0-9]+$/;
    
    isAcceptable(s: string) {
        return s.length === 5 && this.numberRegexp.test(s);
    }
}
