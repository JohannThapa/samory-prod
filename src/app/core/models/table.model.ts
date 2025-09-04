export type Align = 'left' | 'center' | 'right';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  widthClass?: string;
  align?: Align;
  templateName?: string;
  ariaLabel?: string;
  clickable?: boolean;
}

export interface BadgeStyle {
  classes: string;
}

export interface TableActionEvent<T = any> {
  action: string;
  row: T;
  originalEvent?: Event;
}

export interface TableCellEvent<T = any> {
  row: T;
  column: TableColumn<T>;
  originalEvent?: Event;
}
