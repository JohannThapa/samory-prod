import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, input } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { IChartData } from 'src/app/core/models/charts.model';

@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieComponent {
  width = input<number>(700);
  height = input<number>(400);
  @Input() legendPosition: LegendPosition = LegendPosition.Below;
  chartData = input.required<IChartData[]>();
  chartTitle = input<string>('User Type Distribution');
  colorScheme = input<any>({ domain: ['#34D399', '#F87171', '#FBBF24'] });
  gradient = input<boolean>(true);
  animations = input<boolean>(true);

  view = computed<[number, number]>(() => {
    let fullView: [number, number] = [400, 300];
    if (this.width()) fullView[0] = this.width();
    if (this.height()) fullView[1] = this.height();
    return fullView;
  });

  legendItems = computed(() => {
    const domain = this.colorScheme().domain;
    return this.chartData().map((data: any, index: number) => ({
      label: data.name,
      color: domain[index],
      value: data.value,
    }));
  });
}
