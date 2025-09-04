import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTocComponent } from './article-toc.component';

describe('ArticleTocComponent', () => {
  let component: ArticleTocComponent;
  let fixture: ComponentFixture<ArticleTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleTocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
