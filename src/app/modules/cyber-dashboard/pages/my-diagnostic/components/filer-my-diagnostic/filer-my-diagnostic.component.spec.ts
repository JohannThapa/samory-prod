import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerMyDiagnosticComponent } from './filer-my-diagnostic.component';

describe('FilerMyDiagnosticComponent', () => {
  let component: FilerMyDiagnosticComponent;
  let fixture: ComponentFixture<FilerMyDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilerMyDiagnosticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilerMyDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
