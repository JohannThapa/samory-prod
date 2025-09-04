import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoCardComponent } from 'src/app/shared/components/cards/info-card/info-card.component';

@Component({
  selector: 'app-supporting-organizations',
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './supporting-organizations.component.html',
  styleUrl: './supporting-organizations.component.css',
})
export class SupportingOrganizationsComponent {}
