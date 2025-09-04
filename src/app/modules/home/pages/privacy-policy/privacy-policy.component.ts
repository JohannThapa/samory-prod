import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SubsContainerComponent } from '../index/components/subs-container/subs-container.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [CommonModule, TranslateModule, SubsContainerComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {}
