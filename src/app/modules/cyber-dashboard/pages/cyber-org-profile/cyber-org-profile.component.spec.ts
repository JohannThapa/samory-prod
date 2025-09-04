import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberOrgProfileComponent } from './cyber-org-profile.component';

describe('CyberOrgProfileComponent', () => {
  let component: CyberOrgProfileComponent;
  let fixture: ComponentFixture<CyberOrgProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberOrgProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberOrgProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
