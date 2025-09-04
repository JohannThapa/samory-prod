import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMisuseComponent } from './report-misuse.component';

describe('ReportMisuseComponent', () => {
  let component: ReportMisuseComponent;
  let fixture: ComponentFixture<ReportMisuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMisuseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportMisuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
