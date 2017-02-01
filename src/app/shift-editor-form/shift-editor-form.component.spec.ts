/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShiftEditor } from './shift-editor-form.component';

describe('ShiftEditor', () => {
  let component: ShiftEditor;
  let fixture: ComponentFixture<ShiftEditor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftEditor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
