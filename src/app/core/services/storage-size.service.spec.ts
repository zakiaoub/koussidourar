import { TestBed } from '@angular/core/testing';

import { StorageSizeService } from './storage-size.service';

describe('StorageSizeService', () => {
  let service: StorageSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
