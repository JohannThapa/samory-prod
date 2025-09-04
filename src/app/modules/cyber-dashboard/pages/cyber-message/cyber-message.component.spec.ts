import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberMessageComponent } from './cyber-message.component';

describe('CyberMessageComponent', () => {
  let component: CyberMessageComponent;
  let fixture: ComponentFixture<CyberMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
