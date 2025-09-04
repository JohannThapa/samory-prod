import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';

  @Input() width: string = 'w-full';

  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearchChange(): void {
    this.search.emit(this.searchTerm);
  }
}
