import { TestBed } from '@angular/core/testing';

import { CarousleService } from './carousel-service.service';

describe('ProductServiceService', () => {
  let service: CarousleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarousleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
