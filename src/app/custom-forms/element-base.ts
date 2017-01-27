import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValueAccessorBase } from './value-accessor-base';

import {
    AsyncValidatorArray,
    ValidatorArray,
    ValidationResult,
    message,
    validate
} from './validate';
export abstract class ElementBase<T> extends ValueAccessorBase<T>{

    protected abstract model: NgModel;

    constructor(private validators: ValidatorArray,
        private asyncValidators: AsyncValidatorArray) {
        super();
    }

    protected validate(): Observable<ValidationResult> {
        return validate(this.validators, this.asyncValidators)(this.model.control);
    }

    protected get invalid(): Observable<boolean> {
        // Map this to array of booleans after validation
        return this.validate().map(v => Object.keys(v || {}).length > 0);
    }

    protected get failure(): Observable<Array<string>> {
        return this.validate().map(v => Object.keys(v).map(k => message(v, k)));
    }

}