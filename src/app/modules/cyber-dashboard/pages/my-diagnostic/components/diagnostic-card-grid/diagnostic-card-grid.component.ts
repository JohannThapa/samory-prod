import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeStyle, IDiagnosticApplication } from 'src/app/core/models/cyber-org-profile';

@Component({
  selector: 'app-diagnostic-card-grid',
  imports: [CommonModule],
  templateUrl: './diagnostic-card-grid.component.html',
  styleUrl: './diagnostic-card-grid.component.css',
})
export class DiagnosticCardGridComponent {
  @Input() diagnostics: IDiagnosticApplication[] = [];

  statusMap: Record<string, BadgeStyle> = {
    Pending: { classes: 'bg-[#FFA60012] text-[#FFA600]' },
    Submitted: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
    Accepted: { classes: 'bg-[#22C55E12] text-[#22C55E]' },
  };
}
