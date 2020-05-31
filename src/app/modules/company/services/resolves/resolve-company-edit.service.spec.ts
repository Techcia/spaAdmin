import { TestBed } from '@angular/core/testing';

import { ResolveCompanyEditService } from './resolve-company-edit.service';

describe('ResolveCompanyEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveCompanyEditService = TestBed.get(ResolveCompanyEditService);
    expect(service).toBeTruthy();
  });
});
