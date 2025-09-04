import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberDashboardComponent } from './cyber-dashboard.component';

describe('CyberDashboardComponent', () => {
  let component: CyberDashboardComponent;
  let fixture: ComponentFixture<CyberDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
