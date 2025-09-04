import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { DtCellTemplateDirective } from 'src/app/core/directives/dtcell-template.directive';
import { BadgeStyle, TableActionEvent, TableCellEvent, TableColumn } from 'src/app/core/models/table.model';

@Component({
  selector: 'ui-data-table',
  imports: [CommonModule, NgClass, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-data-table.component.html',
  styleUrl: './ui-data-table.component.css',
})
export class UiDataTableComponent<T = any> implements AfterContentInit {
  @Input({ required: true }) columns: TableColumn<T>[] = [];
  @Input({ required: true }) rows: T[] | any[] = [];

  @Input() title = 'Current Diagnostics';
  @Input() subtitle = '';
  @Input() ctaLabel = 'View All';

  @Input() isStrip = false;
  @Input() tableWidthClass = 'max-w-full';
  @Input() cardClass = '';
  @Input() statusBadgeMap: Record<string, BadgeStyle> = {};

  @Output() rowClick = new EventEmitter<T>();
  @Output() cellClick = new EventEmitter<TableCellEvent<T>>();
  @Output() action = new EventEmitter<TableActionEvent<T>>();
  @Output() ctaClick = new EventEmitter<void>();

  @ContentChildren(DtCellTemplateDirective) private templates?: QueryList<DtCellTemplateDirective>;
  private templateMap = signal(new Map<string, TemplateRef<any>>());

  ngAfterContentInit(): void {
    const map = new Map<string, TemplateRef<any>>();
    this.templates?.forEach((t) => map.set(t.name, t.template));
    this.templateMap.set(map);
  }

  emitAction(action: string, row: T, originalEvent?: Event) {
    this.action.emit({ action, row, originalEvent });
  }

  emitCellClick(row: T, column: TableColumn<T>, originalEvent?: Event) {
    if (column.clickable !== false) {
      this.cellClick.emit({ row, column, originalEvent });
    }
  }

  getTpl(name?: string): TemplateRef<any> | null {
    if (!name) return null;
    return this.templateMap().get(name) ?? null;
  }

  rowClass(index: number): string {
    if (!this.isStrip) return 'bg-white';
    return index % 2 === 0 ? 'bg-[#F8F4FE]' : 'bg-white';
  }

  styleForStatus(status: string | undefined): string {
    if (!status) return 'bg-gray-100 text-gray-700 ring-1 ring-gray-200';
    const custom = this.statusBadgeMap[status];
    if (custom) return custom.classes;
    const s = status.toLowerCase();
    if (s.includes('progress')) return 'bg-[#FFA60012] text-[#FFA600] ring-1 ring-amber-200';
    if (s.includes('not')) return 'bg-[#ED635812] text-[#ED6358] ring-1 ring-rose-200';
    if (s.includes('complete')) return 'bg-[#22C55E12] text-[#22C55E] ring-1 ring-emerald-200';
    return 'bg-gray-100 text-gray-700 ring-1 ring-gray-200';
  }

  trackByIndex = (_: number, __: T) => _;
}
