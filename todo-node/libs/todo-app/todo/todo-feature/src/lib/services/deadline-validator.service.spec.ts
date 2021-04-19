import { TestBed } from '@angular/core/testing';

import { DeadlineValidatorService } from './deadline-validator.service';

describe('DeadlineValidatorService', () => {
  let service: DeadlineValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeadlineValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
