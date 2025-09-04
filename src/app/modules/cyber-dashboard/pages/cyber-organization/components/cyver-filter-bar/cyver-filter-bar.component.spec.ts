import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyverFilterBarComponent } from './cyver-filter-bar.component';

describe('CyverFilterBarComponent', () => {
  let component: CyverFilterBarComponent;
  let fixture: ComponentFixture<CyverFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyverFilterBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyverFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
