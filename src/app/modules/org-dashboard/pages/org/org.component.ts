import { Component, OnInit } from '@angular/core';
import { OrgHeaderComponent } from '../../components/org/org-header/org-header.component';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  imports: [OrgHeaderComponent],
})
export class OrgComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
