import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProfileTableComponent } from './org-profile-table.component';

describe('OrgProfileTableComponent', () => {
  let component: OrgProfileTableComponent;
  let fixture: ComponentFixture<OrgProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgProfileTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
