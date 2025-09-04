import { Component, computed, Injectable, signal } from '@angular/core';
import { Helper, helpersMockData } from 'src/app/core/constants/mock-org/helper';

@Injectable({ providedIn: 'root' })
export class CyberHelperStore {
  helpers = signal<Helper[]>(helpersMockData);
  searchQuery = signal<string>('');
  selectedFilters = signal<Record<string, string | string[]>>({
    availability: 'Anytime',
    region: 'All Regions',
    languages: [],
    expertise: [],
    experience: '',
    certification: '',
  });

  filteredHelpers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filters = this.selectedFilters();
    return this.helpers().filter((helper) => {
      const matchesSearch =
        helper.name.toLowerCase().includes(query) ||
        helper.expertise.some((e) => e.toLowerCase().includes(query)) ||
        helper.languages.some((l) => l.toLowerCase().includes(query));

      const matchesAvailability =
        filters['availability'] === 'Anytime' || (filters['availability'] === 'Available Now' && helper.available);
      const matchesRegion = filters['region'] === 'All Regions' || helper.region === filters['region'];
      const matchesLanguages =
        (filters['languages'] as string[]).length === 0 ||
        helper.languages.some((l) => (filters['languages'] as string[]).includes(l));
      const matchesExpertise =
        (filters['expertise'] as string[]).length === 0 ||
        helper.expertise.some((e) => (filters['expertise'] as string[]).includes(e));
      const matchesExperience =
        filters['experience'] === '' || helper.yearsExperience >= this.getExperience(filters['experience'] as string);
      const matchesCertification = filters['certification'] === '' || helper.certification === filters['certification'];

      return (
        matchesSearch &&
        matchesAvailability &&
        matchesRegion &&
        matchesLanguages &&
        matchesExpertise &&
        matchesExperience &&
        matchesCertification
      );
    });
  });

  getExperience(level: string): number {
    switch (level) {
      case 'Entry Level':
        return 1;
      case 'Intermediate':
        return 3;
      case 'Expert':
        return 5;
      default:
        return 0;
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  setFilter(filterName: string, value: string | string[]) {
    this.selectedFilters.update((filters) => ({ ...filters, [filterName]: value }));
  }

  addFilter(filterName: string, value: string) {
    this.selectedFilters.update((filters) => {
      const currentValues = (filters[filterName] as string[]) || [];
      return { ...filters, [filterName]: [...currentValues, value] };
    });
  }

  removeFilter(filterName: string, value: string) {
    this.selectedFilters.update((filters) => {
      const currentValues = (filters[filterName] as string[]) || [];
      return { ...filters, [filterName]: currentValues.filter((v) => v !== value) };
    });
  }
}
