import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AreaChart } from 'src/app/core/constants/mock-charts/area';
import { IChartData, IChartSelectEvent } from 'src/app/core/models/charts.model';
import { PieComponent } from 'src/app/shared/charts/pie/pie.component';
import { RegionActivityComponent } from 'src/app/shared/components/cards/region-activity/region-activity.component';
import { StatsCardComponent } from 'src/app/shared/components/cards/stats-card/stats-card.component';
import { AreaComponent } from 'src/app/shared/charts/area/area.component';
import { PieChart } from 'src/app/core/constants/mock-charts/pie';
import { RecentActivitiesComponent } from '../../components/tables/recent-activities/recent-activities.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    StatsCardComponent,
    RegionActivityComponent,
    CommonModule,
    TranslateModule,
    PieComponent,
    AreaComponent,
    RecentActivitiesComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
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
  onFilterChange(selectedValue: string): void {
    console.log(selectedValue);
  }
  onChartSelect(event: IChartSelectEvent): void {
    console.log('Item selected', event);
  }
  constructor() {}
}
