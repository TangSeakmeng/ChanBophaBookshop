import { TestBed } from '@angular/core/testing';

import { ProductMappingService } from './product-mapping.service';

describe('ProductMappingService', () => {
  let service: ProductMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
