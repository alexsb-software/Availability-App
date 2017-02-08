/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessoinMemberInputComponent } from './sessoin-member-input.component';

describe('SessoinMemberInputComponent', () => {
  let component: SessoinMemberInputComponent;
  let fixture: ComponentFixture<SessoinMemberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessoinMemberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessoinMemberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
