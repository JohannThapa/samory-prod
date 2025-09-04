import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CyberOrgHeaderComponent } from './components/cyber-org-header/cyber-org-header.component';
import { CyberCardGridComponent } from './components/cyber-card-grid/cyber-card-grid.component';
import { Organization, ViewMode } from './models/cyber-org.model';
import { TableColumn } from 'src/app/core/models/table.model';
import { CyberOrganizationService } from 'src/app/core/services/cyber-organization.service';
import { CyverFilterBarComponent } from './components/cyver-filter-bar/cyver-filter-bar.component';
import { UiDataTableComponent } from 'src/app/shared/components/tables/ui-data-table/ui-data-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cyber-organization',
  imports: [
    CommonModule,
    CyberOrgHeaderComponent,
    CyberCardGridComponent,
    CyverFilterBarComponent,
    UiDataTableComponent,
  ],
  templateUrl: './cyber-organization.component.html',
  styleUrl: './cyber-organization.component.css',
})
export class CyberOrganizationComponent implements OnInit {
  organizations = signal<Organization[]>([]);
  viewMode = signal<ViewMode>('list');
  cities = signal<string[]>([]);
  organizationTypes = signal<string[]>([]);

  columns: TableColumn<Organization>[] = [
    { key: 'name', header: 'Name', templateName: 'nameCell', widthClass: 'w-[250px]' },
    { key: 'type', header: 'Type', widthClass: 'w-[150px]' },
    { key: 'city', header: 'City', widthClass: 'w-[150px]' },
    { key: 'website', header: 'Website', templateName: 'websiteCell', widthClass: 'w-[200px]' },
    {
      key: 'actions',
      header: 'Actions',
      templateName: 'actions',
      align: 'left',
      widthClass: 'w-[100px]',
      clickable: false,
    },
  ];

  constructor(private organizationsService: CyberOrganizationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(filters?: { city?: string; type?: string }): void {
    this.organizationsService.getOrganizations(filters).subscribe((data) => {
      this.organizations.set(data);
      this.extractFilterOptions(data);
    });
  }

  extractFilterOptions(data: Organization[]): void {
    const uniqueCities = [...new Set(data.map((org) => org.city))];
    const uniqueTypes = [...new Set(data.map((org) => org.type))];
    this.cities.set(uniqueCities);
    this.organizationTypes.set(uniqueTypes);
  }

  onFilterChange(filters: { city: string; type: string }): void {
    this.fetchData(filters);
  }

  onViewChange(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  onViewDetails(organization: Organization): void {
    console.log('Viewing details for:', organization);
    this.router.navigate(['/dashboard/cyber/cyber-organization', organization.id]);
  }
}
