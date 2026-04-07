import { TestBed } from '@angular/core/testing';

import { StopoverService } from './stopover.service';

describe('StopoverService', () => {
  let service: StopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
