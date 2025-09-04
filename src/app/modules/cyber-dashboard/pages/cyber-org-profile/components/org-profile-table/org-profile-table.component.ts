import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeStyle, CyberDiagnosticEntry } from 'src/app/core/models/cyber-org-profile';
import { TableColumn } from 'src/app/core/models/table.model';
import { UiDataTableComponent } from 'src/app/shared/components/tables/ui-data-table/ui-data-table.component';

@Component({
  selector: 'app-org-profile-table',
  imports: [CommonModule, UiDataTableComponent],
  templateUrl: './org-profile-table.component.html',
  styleUrl: './org-profile-table.component.css',
})
export class OrgProfileTableComponent {
  @Input() diagnosticEntries: CyberDiagnosticEntry[] = [];
  @Input() statusBadgeMap: Record<string, BadgeStyle> = {};
  @Output() viewDiagnostic = new EventEmitter<CyberDiagnosticEntry>();

  columns: TableColumn<CyberDiagnosticEntry>[] = [
    { key: 'label', header: 'Diagnostic Label', widthClass: 'w-[200px]' },
    { key: 'type', header: 'Type', widthClass: 'w-[100px]' },
    { key: 'requestedOn', header: 'Requested On', widthClass: 'w-[150px]' },
    { key: 'completedOn', header: 'Completed On', templateName: 'completedOnCell', widthClass: 'w-[150px]' },
    { key: 'status', header: 'Status', templateName: 'statusPill', widthClass: 'w-[120px]' },
    { key: 'progress', header: 'Progress', templateName: 'progressCell', widthClass: 'w-[100px]' },
    {
      key: 'actions',
      header: 'Actions',
      templateName: 'actionsCell',
      align: 'left',
      widthClass: 'w-[80px]',
      clickable: false,
    },
  ];
}
