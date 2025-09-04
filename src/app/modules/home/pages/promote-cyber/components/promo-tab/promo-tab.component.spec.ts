import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoTabComponent } from './promo-tab.component';

describe('PromoTabComponent', () => {
  let component: PromoTabComponent;
  let fixture: ComponentFixture<PromoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
