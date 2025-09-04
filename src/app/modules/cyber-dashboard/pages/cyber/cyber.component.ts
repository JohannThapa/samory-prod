import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CyberHeaderComponent } from '../../components/nft/cyber-header/cyber-header.component';
import { CommonModule } from '@angular/common';
import { Nft } from 'src/app/modules/dashboard/models/nft';
import { RegionActivityComponent } from 'src/app/shared/components/cards/region-activity/region-activity.component';
import { StatsCardComponent } from 'src/app/shared/components/cards/stats-card/stats-card.component';
import { CardShadowComponent } from 'src/app/shared/components/cards/3d-card-button/3d-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { NftAuctionsTableComponent } from 'src/app/modules/dashboard/components/nft/nft-auctions-table/nft-auctions-table.component';
import { IChartData, IChartSelectEvent, IColor } from 'src/app/core/models/charts.model';
import { ScaleType } from '@swimlane/ngx-charts';
import { BarVerticalStackedComponent } from 'src/app/shared/charts/bar-vertical-stacked/bar-vertical-stacked.component';
import { BarVStacked } from '../../../../core/constants/mock-charts/bar-vertical-stacked';
import { StackedArea } from 'src/app/core/constants/mock-charts/stacked-area';
import { AreaChart } from 'src/app/core/constants/mock-charts/area';
import { PieChart } from 'src/app/core/constants/mock-charts/pie';
import { AreaStackedComponent } from 'src/app/shared/charts/area-stacked/area-stacked.component';
import { DiagnosticsTableComponent } from '../../components/diagnostics-table/diagnostics-table.component';
import { PendingTableComponent } from '../../components/pending-table/pending-table.component';
import { ListCardItem } from 'src/app/core/models/card.model';
import { CardUiListComponent } from 'src/app/shared/components/cards/card-ui-list/card-ui-list.component';
import { CyberStatsCardComponent } from 'src/app/shared/components/cards/cyber-stats-card/cyber-stats-card.component';
import { Subject, takeUntil } from 'rxjs';
import { DashboardOverview } from 'src/app/core/models/cyber-dashboard.model';
import { CyberDashboardService } from 'src/app/core/services/cyber-dashboard.service';

@Component({
  selector: 'app-cyber',
  templateUrl: './cyber.component.html',
  imports: [
    CardShadowComponent,
    CyberStatsCardComponent,
    CommonModule,
    TranslateModule,
    AreaStackedComponent,
    DiagnosticsTableComponent,
    PendingTableComponent,
    CardUiListComponent,
  ],
})
export class CyberComponent implements OnInit, OnDestroy {
  overviewData = signal<DashboardOverview | null>(null);

  private destroy$ = new Subject<void>();

  nft: Array<Nft>;
  barData = BarVStacked;
  chartArrData = signal<IChartData[]>([]);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);
  xAxisLabel = signal<string>('Months');
  stackedAreaChartData = signal<IChartData[]>(StackedArea);
  areaChartData = signal<IChartData[]>(AreaChart);
  pieChartData = signal<any[]>(PieChart);
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

  mockRegions = [
    { name: 'Conakry', percentage: 70 },
    { name: 'Kindia', percentage: 22 },
    { name: 'Labé', percentage: 27 },
    { name: 'Others', percentage: 9 },
  ];
  chartData: IChartData[] = [
    {
      name: 'Pending',
      series: [
        { name: 'Jan', value: 15 },
        { name: 'Feb', value: 25 },
        { name: 'Mar', value: 32 },
        { name: 'Apr', value: 28 },
        { name: 'May', value: 40 },
        { name: 'Jun', value: 35 },
        { name: 'Jul', value: 38 },
        { name: 'Aug', value: 31 },
        { name: 'Sep', value: 33 },
        { name: 'Oct', value: 36 },
        { name: 'Nov', value: 41 },
        { name: 'Dec', value: 45 },
      ],
    },
    {
      name: 'Completed',
      series: [
        { name: 'Jan', value: 22 },
        { name: 'Feb', value: 18 },
        { name: 'Mar', value: 28 },
        { name: 'Apr', value: 35 },
        { name: 'May', value: 30 },
        { name: 'Jun', value: 26 },
        { name: 'Jul', value: 40 },
        { name: 'Aug', value: 25 },
        { name: 'Sep', value: 48 },
        { name: 'Oct', value: 29 },
        { name: 'Nov', value: 33 },
        { name: 'Dec', value: 30 },
      ],
    },
  ];
  colorScheme: IColor = {
    domain: ['#5AA454', '#E44D25'],
    name: '',
    selectable: false,
    group: ScaleType.Time,
  };
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
  onFilterChange(selectedValue: string): void {
    console.log(selectedValue);
  }
  onChartSelect(event: IChartSelectEvent): void {
    console.log('Item selected', event);
  }
  constructor(private cyberDashboardService: CyberDashboardService) {
    this.chartArrData.set(BarVStacked);
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this.getDashboardOverview();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onButtonClick() {}
  onCtaClick(t: string) {}
  private getDashboardOverview(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.cyberDashboardService
      .getOverview()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.overviewData.set(response);
          console.log(response);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to fetch dashboard overview:', err);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
