import { Component, OnInit, signal } from '@angular/core';
import { BadgeStyle, IDiagnosticApplication } from 'src/app/core/models/cyber-org-profile';
import { TableColumn } from 'src/app/core/models/table.model';
import { ViewMode } from '../cyber-organization/models/cyber-org.model';
import { CyberOrganizationService } from 'src/app/core/services/cyber-organization.service';
import { DiagnosticCardGridComponent } from './components/diagnostic-card-grid/diagnostic-card-grid.component';
import { FilerMyDiagnosticComponent } from './components/filer-my-diagnostic/filer-my-diagnostic.component';
import { UiOrgCellComponent } from 'src/app/shared/components/tables/ui-org-cell/ui-org-cell.component';
import { DtCellTemplateDirective } from 'src/app/core/directives/dtcell-template.directive';
import { UiDataTableComponent } from 'src/app/shared/components/tables/ui-data-table/ui-data-table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-diagnostic',
  imports: [
    CommonModule,
    FormsModule,
    UiDataTableComponent,
    DtCellTemplateDirective,
    UiOrgCellComponent,
    FilerMyDiagnosticComponent,
    DiagnosticCardGridComponent,
  ],
  templateUrl: './my-diagnostic.component.html',
  styleUrl: './my-diagnostic.component.css',
})
export class MyDiagnosticComponent implements OnInit {
  diagnostics = signal<IDiagnosticApplication[]>([]);
  viewMode = signal<ViewMode>('list');
  statuses = signal<string[]>([]);
  diagnosticTypes = signal<string[]>([]);

  columns: TableColumn<IDiagnosticApplication>[] = [
    { key: 'label', header: 'Diagnostic Title', templateName: 'diagnostic', widthClass: 'w-[150px]' },
    { key: 'organization', header: 'Organization', templateName: 'organization', widthClass: 'w-[260px]' },
    { key: 'type', header: 'Type', widthClass: 'w-[100px]' },
    { key: 'requestedOn', header: 'Requested On', widthClass: 'w-[140px]' },
    { key: 'completedOn', header: 'Completed On', widthClass: 'w-[140px]' },
    { key: 'justification', header: 'Justification', templateName: 'justification', widthClass: 'w-[200px]' },
    { key: 'status', header: 'Status', templateName: 'statusPill', widthClass: 'w-[120px]' },
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

  statusMap: Record<string, BadgeStyle> = {
    Pending: { classes: 'bg-[#FFA60012] text-[#FFA600]' },
    Submitted: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
    Accepted: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
  };

  constructor(private diagnosticsService: CyberOrganizationService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(filters?: { status?: string; type?: string }): void {
    this.diagnosticsService.getDiagnostics(filters).subscribe((data) => {
      this.diagnostics.set(data);
      this.extractFilterOptions(data);
    });
  }

  extractFilterOptions(data: IDiagnosticApplication[]): void {
    const uniqueStatuses = [...new Set(data.map((d) => d.status))];
    const uniqueTypes = [...new Set(data.map((d) => d.type))];
    this.statuses.set(uniqueStatuses);
    this.diagnosticTypes.set(uniqueTypes);
  }

  onFilterChange(filters: { status: string; type: string }): void {
    this.fetchData(filters);
  }

  onViewChange(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  onAction(evt: any) {
    console.log('Action emitted', evt);
  }

  onRowClick(row: IDiagnosticApplication) {
    console.log('Row clicked', row);
  }
}
