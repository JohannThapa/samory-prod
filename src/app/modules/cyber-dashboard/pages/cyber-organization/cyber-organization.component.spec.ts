import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberOrganizationComponent } from './cyber-organization.component';

describe('CyberOrganizationComponent', () => {
  let component: CyberOrganizationComponent;
  let fixture: ComponentFixture<CyberOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberOrganizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
