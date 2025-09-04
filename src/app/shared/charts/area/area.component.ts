import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IChartData } from 'src/app/core/models/charts.model';

@Component({
  selector: 'app-area-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AreaComponent {
  width = input<number>(700);
  height = input<number>(400);
  chartData = input.required<IChartData[]>();
  chartTitle = input<string>('User Growth Over Time');
  xAxisLabel = input<string>('Months');
  yAxisLabel = input<string>('');
  filterOptions = input<any[]>([]);
  colorScheme = input<any>({ domain: ['#00A06266'] });
  gradient = input<boolean>(true);
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

  filterChange = output<string>();

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedValue);
  }
}
