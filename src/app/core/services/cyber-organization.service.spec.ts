import { TestBed } from '@angular/core/testing';

import { CyberOrganizationService } from './cyber-organization.service';

describe('CyberOrganizationService', () => {
  let service: CyberOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyberOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
