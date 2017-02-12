/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvialabilityRootComponent } from './avialability-root.component';

describe('AvialabilityRootComponent', () => {
  let component: AvialabilityRootComponent;
  let fixture: ComponentFixture<AvialabilityRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvialabilityRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvialabilityRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
