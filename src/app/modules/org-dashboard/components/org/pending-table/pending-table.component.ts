import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DtCellTemplateDirective } from 'src/app/core/directives/dtcell-template.directive';
import { BadgeStyle, TableColumn } from 'src/app/core/models/table.model';
import { UiDataTableComponent } from 'src/app/shared/components/tables/ui-data-table/ui-data-table.component';
import { UiOrgCellComponent } from 'src/app/shared/components/tables/ui-org-cell/ui-org-cell.component';
type Row = {
  label: string;
  org: { name: string; sub?: string };
  startDate: string;
  status: string;
  progress?: string;
};

@Component({
  selector: 'app-pending-table',
  imports: [CommonModule, UiDataTableComponent, UiOrgCellComponent, DtCellTemplateDirective],
  templateUrl: './pending-table.component.html',
  styleUrl: './pending-table.component.css',
})
export class PendingTableComponent {
  columns: TableColumn<Row>[] = [
    { key: 'label', header: 'Diagnostic Title', templateName: 'diagnostic', widthClass: 'w-[150px]' },
    { key: 'org', header: 'Organization', templateName: 'organization', widthClass: 'w-[130px]' },
    { key: 'startDate', header: 'Submitted On', templateName: 'date', widthClass: 'w-[130px]' },
    { key: 'status', header: 'Status', templateName: 'statusPill', widthClass: 'w-[120px]' },
    {
      key: 'actions',
      header: 'Actions',
      templateName: 'actions',
      align: 'left',
      widthClass: 'w-[64px]',
      clickable: false,
    },
  ];

  private _rows: Row[] = [
    {
      label: 'NSecurity Audit',
      org: {
        name: 'Santé Numérique Guinée',
        sub: 'Guinée',
      },
      startDate: '22 Jul 2025',
      status: 'In Progress',
    },
    {
      label: 'Network Audit',
      org: {
        name: 'Commune de Ratoma',
        sub: '',
      },
      startDate: '20 Jul 2025',
      status: 'Not Started',
    },
    {
      label: 'Security Audit',
      org: {
        name: 'ONG Jeunes en Sécurité',
        sub: '',
      },
      startDate: '19 Jul 2025',
      status: 'Completed',
    },
    {
      label: 'Network Security',
      org: {
        name: 'Santé Numérique Guinée',
        sub: 'Guinée',
      },
      startDate: '15 Jul 2025',
      status: 'In Progress',
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
