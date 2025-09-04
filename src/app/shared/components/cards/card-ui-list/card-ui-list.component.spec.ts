import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUiListComponent } from './card-ui-list.component';

describe('CardUiListComponent', () => {
  let component: CardUiListComponent;
  let fixture: ComponentFixture<CardUiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUiListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
