import { TestBed } from '@angular/core/testing';

import { GenerateKeywordService } from './generate-keyword.service';

describe('GenerateKeywordService', () => {
  let service: GenerateKeywordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateKeywordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
