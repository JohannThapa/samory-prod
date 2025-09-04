import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberCardGridComponent } from './cyber-card-grid.component';

describe('CyberCardGridComponent', () => {
  let component: CyberCardGridComponent;
  let fixture: ComponentFixture<CyberCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberCardGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
