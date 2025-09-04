import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarVerticalStackedComponent } from './bar-vertical-stacked.component';

describe('BarVerticalStackedComponent', () => {
  let component: BarVerticalStackedComponent;
  let fixture: ComponentFixture<BarVerticalStackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarVerticalStackedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarVerticalStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
