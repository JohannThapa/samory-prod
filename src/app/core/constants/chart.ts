import { InjectionToken } from '@angular/core';

export interface ChartTheme {
  domain: string[];
  cssVars: {
    '--chart-bg': string;
    '--chart-ink': string;
    '--chart-muted': string;
    '--chart-accent': string;
    '--chart-surface': string;
  };
}

export const DEFAULT_CHART_THEME: ChartTheme = {
  domain: ['#EA4E8B', '#3DDC84', '#FFC145', '#7C5CFF', '#00B2FF', '#FF7A59'],
  cssVars: {
    '--chart-bg': '#0B0116',
    '--chart-ink': '#1B1533',
    '--chart-muted': '#A9A3B7',
    '--chart-accent': '#6D28D9',
    '--chart-surface': '#FFFFFF',
  },
};

interface ChartThemeToken extends InjectionToken<ChartTheme> {
  useFactory: () => ChartTheme;
}

export const CHART_THEME: ChartThemeToken = Object.assign(new InjectionToken<ChartTheme>('CHART_THEME'), {
  useFactory: () => DEFAULT_CHART_THEME,
});
