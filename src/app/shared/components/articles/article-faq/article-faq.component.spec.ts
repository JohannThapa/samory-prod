import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFaqComponent } from './article-faq.component';

describe('ArticleFaqComponent', () => {
  let component: ArticleFaqComponent;
  let fixture: ComponentFixture<ArticleFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
