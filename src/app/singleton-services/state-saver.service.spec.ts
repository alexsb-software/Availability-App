/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StateSaverService } from './state-saver.service';

describe('StateSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateSaverService]
    });
  });

  it('should ...', inject([StateSaverService], (service: StateSaverService) => {
    expect(service).toBeTruthy();
  }));
});
