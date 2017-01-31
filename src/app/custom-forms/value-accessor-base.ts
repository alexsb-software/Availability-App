import { ControlValueAccessor } from '@angular/forms';

// The interface we just defined
export class ValueAccessorBase<T> implements ControlValueAccessor {

    private innerValue: T;

    private changed = new Array<(value: T) => void>();
    private touched = new Array<() => void>();

    get value(): T {
        return this.value;
    }

    set value(value: T) {
        if (this.innerValue === value) return;
        this.innerValue= value;
        // Call all the functions in the array
        this.changed.forEach(f=>f(value));
    }

    touch()
    {
        this.touched.forEach(f=>f());
    }

    writeValue(value:T)
    {
        this.innerValue = value;
    }

    registerOnChange(fn :(value:T)=> void)
    {
        this.changed.push(fn);
    }

    registerOnTouched(fn:()=>void)
    {
        this.touched.push(fn);
    }
}
