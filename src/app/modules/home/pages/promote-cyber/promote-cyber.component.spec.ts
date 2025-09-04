import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteCyberComponent } from './promote-cyber.component';

describe('PromoteCyberComponent', () => {
  let component: PromoteCyberComponent;
  let fixture: ComponentFixture<PromoteCyberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoteCyberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoteCyberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
