import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCardGridComponent } from './diagnostic-card-grid.component';

describe('DiagnosticCardGridComponent', () => {
  let component: DiagnosticCardGridComponent;
  let fixture: ComponentFixture<DiagnosticCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticCardGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
