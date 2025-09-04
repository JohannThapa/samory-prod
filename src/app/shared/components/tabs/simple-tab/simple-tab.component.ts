import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from 'src/app/core/models/layout.model';

@Component({
  selector: 'app-simple-tab',
  imports: [CommonModule],
  templateUrl: './simple-tab.component.html',
  styleUrl: './simple-tab.component.css',
})
export class SimpleTabComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tabValue: string): void {
    this.activeTab = tabValue;
    this.tabChange.emit(tabValue);
  }
}
