import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DiagnosticFilterComponent } from './components/diagnostic-filter/diagnostic-filter.component';
import { DiagnosticResultsComponent } from './components/diagnostic-results/diagnostic-results.component';
import { DiagnosticRow, DiagnosticsFilterValue } from 'src/app/core/models/cyber-dashboard.model';
import { delay, of } from 'rxjs';
import { DiagnosticHeaderComponent } from './components/header/diagnostic-header.component';

@Component({
  selector: 'app-diagnostic-requests',
  imports: [CommonModule, DiagnosticFilterComponent, DiagnosticResultsComponent, DiagnosticHeaderComponent],
  templateUrl: './diagnostic-requests.component.html',
  styleUrl: './diagnostic-requests.component.css',
})
export class DiagnosticRequestsComponent {
  // Mock dataset - could be replaced with a real API call
  private mockData: DiagnosticRow[] = [
    {
      id: 1,
      title: 'Web Security Vulnerability Audit',
      orgName: 'DigitalSafe Conakry',
      orgAvatar: '',
      orgType: 'SME',
      location: 'Kindia',
      postedOn: '2025-07-21',
      status: 'Open',
      description:
        'We are seeking assistance to review our website and ensure we meet minimum cybersecurity compliance standards...',
      tags: ['WebsiteSecurity', 'Audit', 'NonProfit'],
      progress: '40%',
      website: 'www.digitalsafe.gn',
    },
    {
      id: 2,
      title: 'Firewall Configuration Audit',
      orgName: 'DigitalSafe Conakry',
      orgAvatar: 'https://i.pravatar.cc/48?img=18',
      orgType: 'SME',
      location: 'Kindia',
      postedOn: '2025-07-21',
      status: 'Open',
      description:
        'We need help verifying firewall rules, NAT and IPS/IDS settings to ensure they follow best practices and reduce attack surface...',
      tags: ['Network', 'Firewall', 'Audit'],
      progress: '10%',
      website: 'www.digitalsafe.gn',
    },
    {
      id: 3,
      title: 'Phishing Awareness Workshop',
      orgName: 'Community Health NGO',
      orgAvatar: 'https://i.pravatar.cc/48?img=11',
      orgType: 'NGO',
      location: 'Conakry',
      postedOn: '2025-07-20',
      status: 'In Progress',
      description:
        'We are organizing a workshop to train employees on phishing recognition and safe email practices...',
      tags: ['Awareness', 'Workshop'],
      progress: '70%',
      website: 'www.communityhealth.gn',
    },
    {
      id: 4,
      title: 'Mobile App Security Evaluation',
      orgName: 'Startup X',
      orgAvatar: 'https://i.pravatar.cc/48?img=32',
      orgType: 'SME',
      location: 'Kindia',
      postedOn: '2025-07-15',
      status: 'Not Started',
      description: 'Evaluate mobile app for insecure storage, insecure communications, and permissions issues...',
      tags: ['Mobile', 'Evaluation'],
      progress: '0%',
      website: 'www.startupx.gn',
    },
    {
      id: 5,
      title: 'Local Authority Awareness Campaign',
      orgName: 'Municipal Council',
      orgAvatar: '',
      orgType: 'Local Authority',
      location: 'Kindia',
      postedOn: '2025-07-11',
      status: 'Open',
      description:
        'A campaign to build awareness among local civil servants about simple hygiene steps and incident escalation...',
      tags: ['AwarenessCampaign'],
      progress: '0%',
      website: 'www.municipal.gn',
    },
  ];

  // Signals for results & loading
  results = signal<DiagnosticRow[]>(this.mockData);
  loading = signal(false);

  // simulate server POST -> filter
  private fetchFromServer(filterBody: any) {
    this.loading.set(true);

    // Simulate server processing with a small delay
    return of(this.mockData).pipe(delay(300));
  }

  // Called when filter component emits the POST body (filter form)
  onSubmitFilters(body: DiagnosticsFilterValue) {
    // In a real app you'd call an http.post('/api/diagnostics/search', body)
    // For now simulate:
    this.fetchFromServer(body).subscribe((data) => {
      // simple filtering logic client-side that matches typical fields
      const filtered = data.filter((item) => {
        // free text search on title, description, orgName
        if (body.search) {
          const term = body.search.toLowerCase();
          const combined = `${item.title} ${item.description} ${item.orgName}`.toLowerCase();
          if (!combined.includes(term)) return false;
        }

        if (body.city && body.city.length && item.location) {
          if (!body.city.includes(item.location)) return false;
        }

        if (body.types && body.types.length) {
          if (item.orgType && !body.types.includes(item.orgType)) return false;
        }

        if (body.diagnosticTypes && body.diagnosticTypes.length) {
          const intersects = item.tags.some((t) => body.diagnosticTypes?.includes(t));
          if (!intersects) return false;
        }

        if (body.status && body.status.length) {
          if (!body.status.includes(item.status)) return false;
        }

        return true;
      });

      this.results.set(filtered);
      this.loading.set(false);
    });
  }

  // reset -> show all
  onResetFilters() {
    this.results.set(this.mockData);
  }

  onViewDetail(row: DiagnosticRow) {
    // handle view click (navigate or open modal)
    console.log('View: ', row);
    alert(`Open detail for: ${row.title}`);
  }
}
