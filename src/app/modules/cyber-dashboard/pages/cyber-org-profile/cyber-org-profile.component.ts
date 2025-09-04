import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeStyle, CyberDiagnosticEntry, CyberOrganizationProfile } from 'src/app/core/models/cyber-org-profile';
import { CyberOrganizationService } from 'src/app/core/services/cyber-organization.service';
import { OrgProfileTableComponent } from './components/org-profile-table/org-profile-table.component';
import { OrgProfileHeaderComponent } from './components/org-profile-header/org-profile-header.component';

@Component({
  selector: 'app-cyber-org-profile',
  imports: [CommonModule, OrgProfileTableComponent, OrgProfileHeaderComponent],
  templateUrl: './cyber-org-profile.component.html',
  styleUrl: './cyber-org-profile.component.css',
})
export class CyberOrgProfileComponent implements OnInit {
  organization = signal<CyberOrganizationProfile | null>(null);
  diagnosticHistory = signal<CyberDiagnosticEntry[]>([]);

  statusMap: Record<string, BadgeStyle> = {
    'In Progress': { classes: 'bg-[#FFA60012] text-[#FFA600]' },
    Completed: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
    'Not Started': { classes: 'bg-gray-100 text-gray-700' },
  };

  constructor(private route: ActivatedRoute, private organizationProfileService: CyberOrganizationService) {}

  ngOnInit(): void {
    const orgId = this.route.snapshot.paramMap.get('id');
    if (orgId) {
      this.organizationProfileService.getOrganizationDetails(+orgId).subscribe((org) => {
        this.organization.set(org);
      });
      this.organizationProfileService.getDiagnosticHistory(+orgId).subscribe((history) => {
        this.diagnosticHistory.set(history);
      });
    }
  }

  onViewDiagnostic(diagnostic: CyberDiagnosticEntry): void {
    console.log('View Diagnostic:', diagnostic);
  }
}
