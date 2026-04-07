import { TestBed } from '@angular/core/testing';

import { CityImageService } from './city-image.service';

describe('CityImageService', () => {
  let service: CityImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
