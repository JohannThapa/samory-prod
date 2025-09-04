import { Component } from '@angular/core';
import { SupportingOrganizationsComponent } from './components/supporting-organizations/supporting-organizations.component';
import { CyberHelpersLocationComponent } from './components/cyber-helpers-location/cyber-helpers-location.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { QuoteListsComponent } from '../index/components/quote-lists/quote-lists.component';
import { SubsContainerComponent } from '../index/components/subs-container/subs-container.component';

@Component({
  selector: 'app-stats-utils',
  imports: [
    SupportingOrganizationsComponent,
    CyberHelpersLocationComponent,
    AngularSvgIconModule,
    CommonModule,
    TranslateModule,
    QuoteListsComponent,
    SubsContainerComponent,
  ],
  templateUrl: './stats-utils.component.html',
  styleUrl: './stats-utils.component.css',
})
export class StatsUtilsComponent {}
