import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberHelperOrgComponent } from './cyber-helper-org.component';

describe('CyberHelperOrgComponent', () => {
  let component: CyberHelperOrgComponent;
  let fixture: ComponentFixture<CyberHelperOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberHelperOrgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberHelperOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
