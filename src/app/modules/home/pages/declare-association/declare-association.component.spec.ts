import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclareAssociationComponent } from './declare-association.component';

describe('DeclareAssociationComponent', () => {
  let component: DeclareAssociationComponent;
  let fixture: ComponentFixture<DeclareAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclareAssociationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeclareAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
