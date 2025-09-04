import { ScaleType } from '@swimlane/ngx-charts';

export type XValue = string | Date;

export interface ChartPoint {
  name: XValue;
  value: number;
}

export interface ChartSeries {
  name: string;
  series: ChartPoint[];
}

export interface ChartDatum {
  name: string;
  value: number;
}

export interface IChartData {
  name: string;
  series: {
    name: string | number | Date;
    value: number;
    extra?: any;
    min?: number;
    max?: number;
  }[];
}

export interface IColor {
  name: string;
  selectable: boolean;
  group: ScaleType;
  domain: string[];
}

export interface IColorScheme {
  domain: string[] | number[];
  name?: string;
  group?: any;
  selectable?: boolean;
}

export interface IChartSelectEvent {
  name: string;
  value: number;
  series: string;
}

export interface IChartActivateEvent {
  name: string;
  value: number;
  series: string;
}
