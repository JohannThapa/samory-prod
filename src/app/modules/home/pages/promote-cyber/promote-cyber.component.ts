import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ImpactComponent } from './components/impact/impact.component';
import { ResoucesComponent } from './components/resouces/resouces.component';
import { PromoTabComponent } from './components/promo-tab/promo-tab.component';

@Component({
  selector: 'app-promote-cyber',
  imports: [ButtonComponent, TranslateModule, PromoTabComponent, AngularSvgIconModule],
  templateUrl: './promote-cyber.component.html',
  styleUrl: './promote-cyber.component.css',
})
export class PromoteCyberComponent {}
