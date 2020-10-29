import { TestBed } from '@angular/core/testing';

import { BrandMappingService } from './brand-mapping.service';

describe('BrandMappingService', () => {
  let service: BrandMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
