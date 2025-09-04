import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HelpArticle } from 'src/app/core/models/help-center.mode';
import { HelpCenterService } from 'src/app/core/services/help-center.service';
import { ArticleContentComponent } from 'src/app/shared/components/articles/article-content/article-content.component';
import { ArticleFaqComponent } from 'src/app/shared/components/articles/article-faq/article-faq.component';
import { ArticleHeaderComponent } from 'src/app/shared/components/articles/article-header/article-header.component';
import { ArticleTocComponent } from 'src/app/shared/components/articles/article-toc/article-toc.component';

@Component({
  selector: 'app-help-center-detail',
  imports: [
    CommonModule,
    ArticleHeaderComponent,
    ArticleContentComponent,
    ArticleTocComponent,
    ArticleFaqComponent,
    TranslateModule,
  ],
  templateUrl: './help-center-detail.component.html',
  styleUrl: './help-center-detail.component.css',
})
export class HelpCenterDetailComponent {
  private route = inject(ActivatedRoute);
  private helpService = inject(HelpCenterService);

  article?: HelpArticle;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.article = this.helpService.getArticleBySlug(slug);
    }
  }
}
