import { IChartData } from 'src/app/core/models/charts.model';

export const StackedArea: IChartData[] = [
  {
    name: 'Pending Diagnostics',
    series: [
      { name: 'Jan', value: 28 },
      { name: 'Feb', value: 25 },
      { name: 'Mar', value: 32 },
      { name: 'Apr', value: 40 },
      { name: 'May', value: 35 },
      { name: 'Jun', value: 45 },
      { name: 'Jul', value: 38 },
      { name: 'Aug', value: 42 },
      { name: 'Sep', value: 50 },
      { name: 'Oct', value: 48 },
      { name: 'Nov', value: 55 },
      { name: 'Dec', value: 60 },
    ],
  },
  {
    name: 'Completed Diagnostics',
    series: [
      { name: 'Jan', value: 20 },
      { name: 'Feb', value: 30 },
      { name: 'Mar', value: 25 },
      { name: 'Apr', value: 35 },
      { name: 'May', value: 40 },
      { name: 'Jun', value: 30 },
      { name: 'Jul', value: 45 },
      { name: 'Aug', value: 35 },
      { name: 'Sep', value: 40 },
      { name: 'Oct', value: 50 },
      { name: 'Nov', value: 45 },
      { name: 'Dec', value: 55 },
    ],
  },
];
