import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tab } from 'src/app/core/models/layout.model';
import { SimpleTabComponent } from 'src/app/shared/components/tabs/simple-tab/simple-tab.component';
import { OverviewComponent } from '../overview/overview.component';
import { ImpactComponent } from '../impact/impact.component';
import { ResoucesComponent } from '../resouces/resouces.component';

@Component({
  selector: 'app-promo-tab',
  imports: [CommonModule, SimpleTabComponent, OverviewComponent, ImpactComponent, ResoucesComponent],
  templateUrl: './promo-tab.component.html',
  styleUrl: './promo-tab.component.css',
})
export class PromoTabComponent {
  tabs: Tab[] = [
    { label: 'Overview', value: 'overview' },
    { label: 'How to Promote', value: 'promote' },
    { label: 'Resources', value: 'resources' },
    { label: 'Impact', value: 'impact' },
    { label: 'Become and Ambassador', value: 'ambassador' },
  ];

  activeTab = 'overview';
}
