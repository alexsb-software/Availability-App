/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvailabilityHolderService } from './availability-holder.service';

describe('AvailabilityHolderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityHolderService]
    });
  });

  it('should ...', inject([AvailabilityHolderService], (service: AvailabilityHolderService) => {
    expect(service).toBeTruthy();
  }));
});
