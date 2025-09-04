import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from 'src/app/shared/components/cards/category-card/category-card.component';
import { HelpHeaderComponent } from './components/help-header/help-header.component';
import { RecentTopicsComponent } from './components/recent-topics/recent-topics.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-help-center',
  imports: [CommonModule, HelpHeaderComponent, RecentTopicsComponent, TranslateModule, AngularSvgIconModule],

  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.css',
})
export class HelpCenterComponent {
  categories = [
    {
      title: 'Getting Started',
      description: 'Learn how to create an account and apply',
      iconPath: 'assets/icons/internal/arrow-right.svg',
      slug: 'getting-started',
    },
    {
      title: 'Managing Diagnostics',
      description: 'View, accept, and submit diagnostic requests',
      iconPath: 'assets/icons/internal/paper.svg',
      slug: 'managing-diagnostics',
    },
    {
      title: 'Reporting & Documents',
      description: 'How to write and upload reports',
      iconPath: 'assets/icons/internal/stats-paper.svg',
      slug: 'reporting-documents',
    },
    {
      title: 'Security & Ethics',
      description: 'Learn how to create an account and apply',
      iconPath: 'assets/icons/internal/lock.svg',
      slug: 'security-ethics',
    },
    {
      title: 'Tips & Best Practices',
      description: 'View, accept, and submit diagnostic requests',
      iconPath: 'assets/icons/internal/cloud-lock.svg',
      slug: 'tips-and-best-practices',
    },
    {
      title: 'Contact Support',
      description: 'How to write and upload reports',
      iconPath: 'assets/icons/internal/phone-xl.svg',
      slug: 'contact-support',
    },
  ];
  private router = inject(Router);

  navigateTo(slug: string) {
    this.router.navigate(['/help', slug]);
  }

  topics = [
    { title: 'How to Accept a Diagnostic Request', link: '#' },
    { title: 'Where to Find the Report Template', link: '#' },
    { title: 'Cyber Helper Code of Conduct', link: '#' },
    { title: 'Understanding Your Helper Dashboard', link: '#' },
    { title: 'Submitting a Completed Diagnostic', link: '#' },
    { title: 'How to Contact the Platform Admin', link: '#' },
  ];
}
