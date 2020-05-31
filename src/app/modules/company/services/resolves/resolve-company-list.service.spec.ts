import { TestBed } from '@angular/core/testing';

import { ResolveCompanyListService } from './resolve-company-list.service';

describe('ResolveCompanyListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveCompanyListService = TestBed.get(ResolveCompanyListService);
    expect(service).toBeTruthy();
  });
});
