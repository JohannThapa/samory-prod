import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiagnosticComponent } from './my-diagnostic.component';

describe('MyDiagnosticComponent', () => {
  let component: MyDiagnosticComponent;
  let fixture: ComponentFixture<MyDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDiagnosticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
