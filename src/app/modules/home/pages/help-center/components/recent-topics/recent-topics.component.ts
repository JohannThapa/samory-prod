import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-topics',
  imports: [CommonModule],
  templateUrl: './recent-topics.component.html',
  styleUrl: './recent-topics.component.css',
})
export class RecentTopicsComponent {
  @Input({ required: true }) topics!: { title: string; link: string }[];
}
