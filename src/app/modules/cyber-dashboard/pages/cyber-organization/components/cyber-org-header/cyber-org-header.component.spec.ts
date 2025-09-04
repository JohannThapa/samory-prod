import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberOrgHeaderComponent } from './cyber-org-header.component';

describe('CyberOrgHeaderComponent', () => {
  let component: CyberOrgHeaderComponent;
  let fixture: ComponentFixture<CyberOrgHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberOrgHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberOrgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
