import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiColContainerComponent } from './multi-col-container.component';

describe('MultiColContainerComponent', () => {
  let component: MultiColContainerComponent;
  let fixture: ComponentFixture<MultiColContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiColContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiColContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
