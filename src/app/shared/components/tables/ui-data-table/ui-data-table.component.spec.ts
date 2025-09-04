import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDataTableComponent } from './ui-data-table.component';

describe('UiDataTableComponent', () => {
  let component: UiDataTableComponent;
  let fixture: ComponentFixture<UiDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
