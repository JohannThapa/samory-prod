import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-cyber-filter-bar',
  imports: [CommonModule, FormsModule, AngularSvgIconModule, NgSelectModule],
  templateUrl: './cyver-filter-bar.component.html',
  styleUrl: './cyver-filter-bar.component.css',
})
export class CyverFilterBarComponent {
  @Input() cities: string[] = [];
  @Input() organizationTypes: string[] = [];
  @Input() viewMode: 'list' | 'grid' = 'list';
  @Output() filterChange = new EventEmitter<{ city: string; type: string }>();
  @Output() viewChange = new EventEmitter<'list' | 'grid'>();

  selectedCity = signal<string>('');
  selectedType = signal<string>('');

  onFilterApply(): void {
    this.filterChange.emit({
      city: this.selectedCity(),
      type: this.selectedType(),
    });
  }
}
