import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DtCellTemplateDirective } from 'src/app/core/directives/dtcell-template.directive';
import { TableColumn, BadgeStyle } from 'src/app/core/models/table.model';
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
  selector: 'app-recent-activities',
  imports: [CommonModule, UiDataTableComponent, UiOrgCellComponent, DtCellTemplateDirective],
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.css',
})
export class RecentActivitiesComponent {
  columns: TableColumn<Row>[] = [
    { key: 'startDate', header: 'Date', templateName: 'date', widthClass: 'w-[130px]' },
    { key: 'label', header: 'Action', templateName: 'diagnostic', widthClass: 'w-[150px]' },
    { key: 'org', header: 'By', templateName: 'organization', widthClass: 'w-[130px]' },
    { key: 'status', header: 'Type', templateName: 'statusPill', widthClass: 'w-[120px]' },
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
      label: 'Diagnostic submitted by Org 123',
      org: {
        name: 'Santé Numérique Guinée',
        sub: '',
      },
      startDate: '22 Jul 2025',
      status: 'Diagnostic',
    },
    {
      label: 'Network Audit',
      org: {
        name: 'Commune de Ratoma',
        sub: '',
      },
      startDate: '20 Jul 2025',
      status: 'Registration',
    },
    {
      label: 'Security Audit',
      org: {
        name: 'ONG Jeunes en Sécurité',
        sub: '',
      },
      startDate: '19 Jul 2025',
      status: 'Labelled',
    },
    {
      label: 'Misuse reported',
      org: {
        name: 'Santé Numérique Guinée',
        sub: '',
      },
      startDate: '15 Jul 2025',
      status: 'Misuse',
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
