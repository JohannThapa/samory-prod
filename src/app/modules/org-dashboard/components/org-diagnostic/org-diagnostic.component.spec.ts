import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDiagnosticComponent } from './org-diagnostic.component';

describe('OrgDiagnosticComponent', () => {
  let component: OrgDiagnosticComponent;
  let fixture: ComponentFixture<OrgDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgDiagnosticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
