import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  input,
  Output,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IChartActivateEvent, IChartData, IChartSelectEvent } from 'src/app/core/models/charts.model';

@Component({
  selector: 'app-bar-vertical-stacked',
  imports: [CommonModule, NgxChartsModule, NgSelectModule],
  templateUrl: './bar-vertical-stacked.component.html',
  styleUrl: './bar-vertical-stacked.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BarVerticalStackedComponent {
  width = input<number>(700);
  height = input<number>(400);
  barPadding = input<number>(28);
  chartData = input.required<IChartData[]>();
  chartTitle = input<string>('Risk Level');
  xAxisLabel = input<string>('Months');
  yAxisLabel = input<string>('');
  filterOptions = input<any[]>([]);
  loading = input<boolean>(false);
  error = input<boolean>(false);
  colorScheme = input<any>({ domain: ['#ED6358', '#FFA600', '#22C55E'] });
  gradient = input<boolean>(false);
  showXAxis = input<boolean>(true);
  showYAxis = input<boolean>(true);
  showXAxisLabel = input<boolean>(true);
  showYAxisLabel = input<boolean>(true);
  animations = input<boolean>(true);

  // Computed signal to get the view dimensions, avoiding re-creation on every CD cycle
  view = computed<[number, number]>(() => {
    let fullView: [number, number] = [400, 300];
    if (this.width()) fullView[0] = this.width();
    if (this.height()) fullView[1] = this.height();
    return fullView;
  });

  legendItems = computed(() => {
    const domain = this.colorScheme().domain;
    return [
      { label: 'High', color: domain[0] },
      { label: 'Medium', color: domain[1] },
      { label: 'Low', color: domain[2] },
    ];
  });

  filterChange = output<string>();

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(selectedValue);
  }

  onSelect(event: any): void {
    // You can implement custom logic here if needed
  }
}
