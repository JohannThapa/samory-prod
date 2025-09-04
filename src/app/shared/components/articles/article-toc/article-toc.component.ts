import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HelpArticle, HelpArticleSection } from 'src/app/core/models/help-center.mode';

@Component({
  selector: 'app-article-toc',
  imports: [CommonModule, TranslateModule],
  templateUrl: './article-toc.component.html',
  styleUrl: './article-toc.component.css',
})
export class ArticleTocComponent {
  @Input() sections: HelpArticleSection[] | null = null;
  @Input() article: HelpArticle | undefined;

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
