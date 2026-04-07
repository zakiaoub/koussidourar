import { TestBed } from '@angular/core/testing';

import { ParseDataService } from './parse-data.service';

describe('ParseDataService', () => {
  let service: ParseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
