import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-filer-my-diagnostic',
  imports: [CommonModule, FormsModule, AngularSvgIconModule],
  templateUrl: './filer-my-diagnostic.component.html',
  styleUrl: './filer-my-diagnostic.component.css',
})
export class FilerMyDiagnosticComponent {
  @Input() statuses: string[] = [];
  @Input() diagnosticTypes: string[] = [];
  @Input() viewMode: 'list' | 'grid' = 'list';
  @Output() filterChange = new EventEmitter<{ status: string; type: string }>();
  @Output() viewChange = new EventEmitter<'list' | 'grid'>();

  selectedStatus = signal<string>('');
  selectedType = signal<string>('');

  onFilterApply(): void {
    this.filterChange.emit({
      status: this.selectedStatus(),
      type: this.selectedType(),
    });
  }
}
