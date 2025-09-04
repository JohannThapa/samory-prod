import { Injectable } from '@angular/core';
import { Organization } from 'src/app/modules/cyber-dashboard/pages/cyber-organization/models/cyber-org.model';
import { MOCK_CYBER_ORGANIZATIONS } from '../constants/mock-cyber-helpers/cyber-org';
import { Observable, of } from 'rxjs';
import { CyberDiagnosticEntry, CyberOrganizationProfile, IDiagnosticApplication } from '../models/cyber-org-profile';
import { myDiagnosticmockData } from '../constants/mock-cyber-helpers/cyber-my-diagnostic';

@Injectable({
  providedIn: 'root',
})
export class CyberOrganizationService {
  private mockOrganization: CyberOrganizationProfile = {
    id: 1,
    name: 'DigitalSafe Conakry',
    location: 'Kindia',
    type: 'Non Profit',
    description: `Lorem ipsum dolor sit amet consectetur Ullamcorper vel cursus eu lorem lectus vitae quam vel. Quam varius mattis ut commodo netus enim leo tempus amet. Lorem at dis pharetra facilisis. Id proin urna ornare feugiat in blandit id interdum proin.`,
    contact: {
      email: 'linsan.saliou@gmail.com',
      phone: '+224 620 12 34 56',
      website: 'jeunescitoyens.org',
    },
    logoUrl: 'assets/logos/elite.png',
  };

  private mockDiagnosticHistory: CyberDiagnosticEntry[] = [
    {
      id: 'D#128',
      label: 'Diagnostic #128',
      type: 'Audit',
      requestedOn: '22 Jul 2025',
      completedOn: undefined,
      status: 'In Progress',
      progress: 40,
    },
    {
      id: 'D#129',
      label: 'Diagnostic #129',
      type: 'Audit',
      requestedOn: '22 Jul 2025',
      completedOn: '25 Jul 2025',
      status: 'Completed',
      progress: 100,
    },
  ];

  getOrganizations(filters?: { city?: string; type?: string }): Observable<Organization[]> {
    let filteredOrgs = MOCK_CYBER_ORGANIZATIONS;

    if (filters) {
      if (filters.city) {
        filteredOrgs = filteredOrgs.filter((org) => org.city === filters.city);
      }
      if (filters.type) {
        filteredOrgs = filteredOrgs.filter((org) => org.type === filters.type);
      }
    }

    return of(filteredOrgs);
  }
  getOrganizationDetails(id: number): Observable<CyberOrganizationProfile> {
    return of(this.mockOrganization);
  }

  getDiagnosticHistory(organizationId: number): Observable<CyberDiagnosticEntry[]> {
    return of(this.mockDiagnosticHistory);
  }

  getDiagnostics(filters?: { status?: string; type?: string }): Observable<IDiagnosticApplication[]> {
    let filteredData = myDiagnosticmockData;

    if (filters) {
      if (filters.status) {
        filteredData = filteredData.filter((d) => d.status === filters.status);
      }
      if (filters.type) {
        filteredData = filteredData.filter((d) => d.type === filters.type);
      }
    }
    return of(filteredData);
  }
}
