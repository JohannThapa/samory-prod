import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaStackedComponent } from './area-stacked.component';

describe('AreaStackedComponent', () => {
  let component: AreaStackedComponent;
  let fixture: ComponentFixture<AreaStackedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaStackedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
