/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextSearchHelperComponent } from './text-search-helper.component';

describe('TextSearchHelperComponent', () => {
  let component: TextSearchHelperComponent;
  let fixture: ComponentFixture<TextSearchHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSearchHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
