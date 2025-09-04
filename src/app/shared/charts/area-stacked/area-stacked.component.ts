import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { IChartData } from 'src/app/core/models/charts.model';

@Component({
  selector: 'app-area-stacked-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './area-stacked.component.html',
  styleUrl: './area-stacked.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaStackedComponent {
  width = input<number>(700);
  height = input<number>(400);
  chartData = input.required<IChartData[]>();
  chartTitle = input<string>('Diagnostics Status');
  xAxisLabel = input<string>('Months');
  yAxisLabel = input<string>('');
  filterOptions = input<any[]>([]);
  colorScheme = input<any>({ domain: ['#5AA454', '#E44D25'] });
  gradient = input<boolean>(false);
  showXAxis = input<boolean>(true);
  showYAxis = input<boolean>(true);
  showXAxisLabel = input<boolean>(true);
  showYAxisLabel = input<boolean>(true);
  animations = input<boolean>(true);

  view = computed<[number, number]>(() => {
    let fullView: [number, number] = [400, 300];
    if (this.width()) fullView[0] = this.width();
    if (this.height()) fullView[1] = this.height();
    return fullView;
  });

  legendItems = computed(() => {
    const domain = this.colorScheme().domain;
    return [
      { label: 'Pending', color: domain[0] },
      { label: 'Completed', color: domain[1] },
    ];
  });

  filterChange = output<string>();

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedValue);
  }
}
