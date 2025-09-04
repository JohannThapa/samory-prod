import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HelpArticle } from 'src/app/core/models/help-center.mode';

@Component({
  selector: 'app-article-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './article-header.component.html',
  styleUrl: './article-header.component.css',
})
export class ArticleHeaderComponent {
  @Input() article: HelpArticle | undefined;
}
