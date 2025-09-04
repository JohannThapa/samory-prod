import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DtCellTemplateDirective } from 'src/app/core/directives/dtcell-template.directive';
import { BadgeStyle, TableColumn } from 'src/app/core/models/table.model';
import { UiDataTableComponent } from 'src/app/shared/components/tables/ui-data-table/ui-data-table.component';
import { UiOrgCellComponent } from 'src/app/shared/components/tables/ui-org-cell/ui-org-cell.component';
type Row = {
  label: string;
  org: { avatar: string; name: string; sub?: string };
  startDate: string;
  status: string;
  progress: string;
};

@Component({
  selector: 'app-diagnostics-table',
  imports: [CommonModule, UiDataTableComponent, UiOrgCellComponent, DtCellTemplateDirective],

  templateUrl: './diagnostics-table.component.html',
  styleUrl: './diagnostics-table.component.css',
})
export class DiagnosticsTableComponent {
  columns: TableColumn<Row>[] = [
    { key: 'label', header: 'Diagnostic Label', templateName: 'diagnostic', widthClass: 'w-[200px]' },
    { key: 'org', header: 'Organization', templateName: 'organization', widthClass: 'w-[260px]' },
    { key: 'startDate', header: 'Start Date', templateName: 'date', widthClass: 'w-[140px]' },
    { key: 'status', header: 'Status', templateName: 'statusPill', widthClass: 'w-[140px]' },
    { key: 'progress', header: 'Progress', templateName: 'progress', align: 'left', widthClass: 'w-[100px]' },
    {
      key: 'actions',
      header: 'Actions',
      templateName: 'actions',
      align: 'left',
      widthClass: 'w-[84px]',
      clickable: false,
    },
  ];

  private _rows: Row[] = [
    {
      label: 'Diagnostic #128',
      org: {
        avatar: 'https://i.pravatar.cc/64?img=15',
        name: 'Santé Numérique Guinée',
        sub: 'Guinée',
      },
      startDate: '22 Jul 2025',
      status: 'In Progress',
      progress: '40%',
    },
    {
      label: 'Diagnostic #129',
      org: {
        avatar: 'https://i.pravatar.cc/64?img=19',
        name: 'Commune de Ratoma',
        sub: '',
      },
      startDate: '20 Jul 2025',
      status: 'Not Started',
      progress: '0%',
    },
    {
      label: 'Diagnostic #200',
      org: {
        avatar: 'https://i.pravatar.cc/64?img=5',
        name: 'ONG Jeunes en Sécurité',
        sub: '',
      },
      startDate: '19 Jul 2025',
      status: 'Completed',
      progress: '100%',
    },
    {
      label: 'Diagnostic #123',
      org: {
        avatar: 'https://i.pravatar.cc/64?img=8',
        name: 'Santé Numérique Guinée',
        sub: 'Guinée',
      },
      startDate: '15 Jul 2025',
      status: 'In Progress',
      progress: '40%',
    },
  ];
  rows = signal<Row[]>(this._rows);

  statusMap: Record<string, BadgeStyle> = {
    'In Progress': { classes: 'bg-[#FFA60012] text-[#FFA600]' },
    'Not Started': { classes: 'bg-[#ED635812] text-[#ED6358] ' },
    Completed: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
  };

  onCta() {
    console.log('CTA clicked');
  }

  onRowClick(row: Row) {
    console.log('Row clicked', row);
  }

  onCellClick(evt: any) {
    console.log('Cell clicked', evt);
  }

  onAction(evt: any) {
    console.log('Action emitted', evt);
  }
}
