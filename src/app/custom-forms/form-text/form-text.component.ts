import {
  Component,
  Input,
  Optional,
  Inject,
  ViewChild,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS
} from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FormTextComponent, multi: true }]
})
export class FormTextComponent extends ValueAccessorBase<string>{

  constructor(
    @Optional() @Inject(NG_VALIDATORS) private validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) private asyncValidators: Array<any>,
  ) {
    super();
  }


}
