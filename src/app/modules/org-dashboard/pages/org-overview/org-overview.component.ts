import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AreaStackedComponent } from 'src/app/shared/charts/area-stacked/area-stacked.component';
import { CardShadowComponent } from 'src/app/shared/components/cards/3d-card-button/3d-card.component';
import { RegionActivityComponent } from 'src/app/shared/components/cards/region-activity/region-activity.component';
import { StatsCardComponent } from 'src/app/shared/components/cards/stats-card/stats-card.component';
import { NftAuctionsTableComponent } from '../../../dashboard/components/nft/nft-auctions-table/nft-auctions-table.component';
import { BarVerticalStackedComponent } from 'src/app/shared/charts/bar-vertical-stacked/bar-vertical-stacked.component';
import { BarVStacked } from 'src/app/core/constants/mock-charts/bar-vertical-stacked';
import { IChartData, IChartSelectEvent } from 'src/app/core/models/charts.model';
import { StackedArea } from 'src/app/core/constants/mock-charts/stacked-area';
import { ListCardItem } from 'src/app/core/models/card.model';
import { CardUiListComponent } from 'src/app/shared/components/cards/card-ui-list/card-ui-list.component';
import { PendingTableComponent } from '../../components/org/pending-table/pending-table.component';
import { OrgDiagnosticComponent } from '../../components/org-diagnostic/org-diagnostic.component';

@Component({
  selector: 'app-org-overview',
  imports: [
    StatsCardComponent,
    CommonModule,
    TranslateModule,
    BarVerticalStackedComponent,
    AreaStackedComponent,
    PendingTableComponent,
    CardUiListComponent,
    OrgDiagnosticComponent,
  ],
  templateUrl: './org-overview.component.html',
  styleUrl: './org-overview.component.css',
})
export class OrgOverviewComponent {
  barData = BarVStacked;
  chartArrData = signal<IChartData[]>([]);
  stackedAreaChartData = signal<IChartData[]>(StackedArea);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  filterOptions = [
    { value: 'month', label: 'this month' },
    { value: 'year', label: 'this year' },
  ];
  mockActivities = [
    { date: '2025-08-07', action: 'Diagnostic submitted', by: 'Org 123', type: 'Diagnostic' },
    { date: '2025-08-07', action: 'New organization registered', by: 'Admin', type: 'Registration' },
    { date: '2025-08-07', action: 'Misuse reported', by: 'Org 214', type: 'Misuse' },
    { date: '2025-08-07', action: 'Diagnostic submitted', by: 'Org 123', type: 'Diagnostic' },
  ];
  messages = signal<ListCardItem[]>([
    {
      id: '1',
      primary: 'SOS Guinée',
      secondary: "We've Uploaded Some New Server Logs...",
      meta: 'Just Now',
      image: './assets/images/img-01.jpg',
    },
    {
      id: '2',
      primary: 'CleanCity NGO',
      secondary: "We've Uploaded Some New Server Logs...",
      meta: 'Just Now',
      image: './assets/images/img-02.jpg',
    },
    {
      id: '3',
      primary: 'Women Cyber Network',
      secondary: 'Looking Forward to Your Diagnostic!',
      meta: 'Just Now',
      image: './assets/images/img-03.jpg',
    },
    {
      id: '4',
      primary: 'Herman Group',
      secondary: 'Can We Schedule a Zoom Call Tomorrow?',
      meta: 'Just Now',
      image: 'https://i.pravatar.cc/64?img=21',
    },
  ]);
  notifications = signal<ListCardItem[]>([
    {
      id: '1',
      primary: 'Your application for "Network Security Audit" was accepted',
      secondary: 'Just Now',
      icon: 'assets/icons/internal/chat.svg',
      iconColor: 'text-white',
      iconBgColor: 'bg-success',
    },
    {
      id: '2',
      primary: 'New diagnostic request posted in your area.',
      secondary: '24 min ago',
      icon: 'assets/icons/heroicons/solid/desktop.svg',
      iconColor: 'text-primary',
      iconBgColor: 'bg-gray-200',
    },
    {
      id: '3',
      primary: 'You have 1 unread message from Org: Conakry Digital Trust',
      secondary: '24 min ago',
      icon: 'assets/icons/heroicons/solid/envelope.svg',
      iconColor: 'text-warning',
      iconBgColor: 'bg-success',
    },
    {
      id: '4',
      primary: 'New diagnostic request posted in your area.',
      secondary: '24 min ago',
      icon: 'assets/icons/heroicons/solid/envelope.svg',
      iconColor: 'text-red-800',
      iconBgColor: 'bg-red-200',
    },
  ]);
  mockRegions = [
    { name: 'Conakry', percentage: 70 },
    { name: 'Kindia', percentage: 22 },
    { name: 'Labé', percentage: 27 },
    { name: 'Others', percentage: 9 },
  ];
  onCtaClick(t: string) {}
  onFilterChange(selectedValue: string): void {
    console.log(selectedValue);
  }
  onChartSelect(event: IChartSelectEvent): void {
    console.log('Item selected', event);
  }

  constructor() {
    this.chartArrData.set(BarVStacked);
  }
}
