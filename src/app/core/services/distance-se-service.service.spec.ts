import { TestBed } from '@angular/core/testing';
import { DistanceSeService } from './distance-se-service.service';

describe('DistanceSeService', () => {
  let service: DistanceSeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceSeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
