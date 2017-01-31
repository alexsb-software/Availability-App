
// This module should be implemented only once in out lives, 1 time hardship
// is better than many small ones
// Source: http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/

import {
    AbstractControl,
    AsyncValidatorFn,
    Validator,
    Validators,
    ValidatorFn
} from '@angular/forms';

import { Observable } from 'rxjs';

export type ValidationResult = { [validator: string]: string | boolean };
export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;
export type ValidatorArray = Array<Validator | ValidatorFn>;

const normalizeValidator =
    (validator: Validator | ValidatorFn): ValidatorFn | AsyncValidatorFn => {

        // Boud validator function extracted from ValidatorFn or AsyncValidatorFn
        const func = (validator as Validator).validate.bind(validator);

        if (typeof func === 'function') {
            // Call the function on the given control
            return (c: AbstractControl) => { func(c); };
        }

        // Return the original object if it's not a function
        return <ValidatorFn | AsyncValidatorFn>validator;

    };

export const composeValidators =
    (validators: ValidatorArray): AsyncValidatorFn | ValidatorFn => {

        if (validators == null || validators.length === 0) return null;

        // Calls normalize on each object (function) of the validator
        // array passed here
        return Validators.compose(validators.map(normalizeValidator));
    };

export const message = (validator: ValidationResult, key: string): string => {
    switch (key) {
        case 'required':
            return 'Please enter a value';
        case 'pattern':
            return 'Value does not match required pattern';
        case 'minlength':
            return 'Value must be N characters';
        case 'maxlength':
            return 'Value must be a maximum of N characters';
    }


    switch (typeof validator[key]) {
        case 'string':
            return <string>validator[key];
        default:
            return `Validation failed: ${key}`;
    }
};

export const validate = (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
    return (control: AbstractControl) => {

        // Synchronus validation is kept as a variable because it's
        // needed later, unlike the async validator which is used instantly
        const synchronousValid = () => composeValidators(validators)(control);

        if (asyncValidators) {
            const asyncValidator = composeValidators(asyncValidators);

            return asyncValidator(control).map(v => {
                const secondary = synchronousValid();
                if (secondary || v) { // compose async and sync validator results
                    return Object.assign({}, secondary, v);
                }
            });
        }


        if (validators) {
            return Observable.of(synchronousValid());
        }

        return Observable.of(null);
    };
};