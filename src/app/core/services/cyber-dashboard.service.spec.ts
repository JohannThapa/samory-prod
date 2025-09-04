import { TestBed } from '@angular/core/testing';

import { CyberDashboardService } from './cyber-dashboard.service';

describe('CyberDashboardService', () => {
  let service: CyberDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyberDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
