import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResoucesComponent } from './resouces.component';

describe('ResoucesComponent', () => {
  let component: ResoucesComponent;
  let fixture: ComponentFixture<ResoucesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResoucesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResoucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
