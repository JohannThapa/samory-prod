import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { QuoteListsComponent } from '../../../index/components/quote-lists/quote-lists.component';
import { ReadyBannerComponent } from '../../../index/components/ready-banner/ready-banner.component';
import { SubsContainerComponent } from '../../../index/components/subs-container/subs-container.component';

@Component({
  selector: 'app-overview',
  imports: [AngularSvgIconModule, CommonModule, QuoteListsComponent, ReadyBannerComponent, SubsContainerComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
