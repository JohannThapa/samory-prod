import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from '../../models/cyber-org.model';

@Component({
  selector: 'app-cyber-card-grid',
  imports: [CommonModule],
  templateUrl: './cyber-card-grid.component.html',
  styleUrl: './cyber-card-grid.component.css',
})
export class CyberCardGridComponent {
  @Input() organizations: Organization[] = [];
  @Output() viewDetails = new EventEmitter<Organization>();
}
