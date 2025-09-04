import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HelpArticle, HelpArticleSection } from 'src/app/core/models/help-center.mode';

@Component({
  selector: 'app-article-content',
  imports: [CommonModule, TranslateModule],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.css',
})
export class ArticleContentComponent {
  @Input() article: HelpArticle | undefined;
}
