import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { mockFilterData } from 'src/app/core/constants/mock-org/helper';
import { CyberHelperStore } from '../../../../core/store/cyber-helper-store.store';
import { HelperCyberCardComponent } from './components/helper-card/helper-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cyber-helper-org',
  imports: [CommonModule, FormsModule, HelperCyberCardComponent],
  templateUrl: './cyber-helper-org.component.html',
  styleUrl: './cyber-helper-org.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CyberHelperOrgComponent {
  public store = inject(CyberHelperStore);
  public openDropdown = signal<string | null>(null);
  public regionSearch = signal<string>('');

  activeFilterCount = computed(() => {
    const filters = this.store.selectedFilters();
    let count = 0;
    if (filters['availability'] === 'Available Now') count++;
    if (filters['region'] && filters['region'] !== 'All Regions') count++;
    return count;
  });

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.store.setSearchQuery(inputElement.value);
  }

  toggleDropdown(dropdownName: string) {
    this.openDropdown.update((current) => (current === dropdownName ? null : dropdownName));
  }

  isDropdownOpen(dropdownName: string) {
    return this.openDropdown() === dropdownName;
  }

  selectFilter(filterName: string, value: string) {
    this.store.setFilter(filterName, value);
    if (filterName !== 'region') {
      this.closeDropdown();
    }
  }

  resetRegionFilter() {
    this.regionSearch.set('');
    this.store.setFilter('region', 'All Regions');
  }

  closeDropdown() {
    this.openDropdown.set(null);
  }

  filteredRegions = computed(() => {
    const query = this.regionSearch().toLowerCase();
    return mockFilterData.regions.filter((region) => region.toLowerCase().includes(query));
  });
}
