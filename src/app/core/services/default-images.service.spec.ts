import { TestBed } from '@angular/core/testing';

import { DefaultImagesService } from './default-images.service';

describe('DefaultImagesService', () => {
  let service: DefaultImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
