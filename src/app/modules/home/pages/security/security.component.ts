import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionCardComponent } from 'src/app/shared/components/containers/section-card/section-card.component';
import { GovernanceFeatureCardComponent } from './components/governance-feature-card/governance-feature-card.component';
import { TwoColFeatureBoxComponent } from 'src/app/shared/components/containers/two-col-feature-box/two-col-feature-box.component';
import { AccessConfCardComponent } from './components/access-conf-card/access-conf-card.component';
import {
  AccessCards,
  DefenseL1,
  DefenseL2,
  DefenseL3,
  DefenseR1,
  DefenseR2,
  DefenseR3,
  ProtectionBottomLeft,
  ProtectionBottomRight,
  ProtectionLeft,
  ProtectionRight,
  Security,
} from './data';
import { MultiColContainerComponent } from 'src/app/shared/components/containers/multi-col-container/multi-col-container.component';
import { SubsContainerComponent } from '../index/components/subs-container/subs-container.component';

@Component({
  selector: 'app-security',
  imports: [
    CommonModule,
    SectionCardComponent,
    GovernanceFeatureCardComponent,
    AccessConfCardComponent,
    MultiColContainerComponent,
    SubsContainerComponent,
  ],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
})
export class SecurityComponent {
  governance = Security;
  protectionLeft = ProtectionLeft;
  protectionRight = ProtectionRight;
  protectionBottomLeft = ProtectionBottomLeft;
  protectionBottomRight = ProtectionBottomRight;
  defenseL1 = DefenseL1;
  defenseL2 = DefenseL2;
  defenseL3 = DefenseL3;
  defenseR1 = DefenseR1;
  defenseR2 = DefenseR2;
  defenseR3 = DefenseR3;
  accessCards = AccessCards;
  protectionItems = [
    {
      title: 'SSL/TLS Encryption',
      items: [
        'All data exchanged between users and our platform is encrypted using HTTPS.',
        'Ensures secure and private communication.',
      ],
      iconSrc: 'assets/icons/lock.svg',
    },
    {
      title: 'Secure Authentication',
      items: [
        'Passwords are hashed and stored with modern encryption methods.',
        'Prevents unauthorized access to user accounts.',
      ],
      iconSrc: 'assets/icons/lock.svg',
    },
    {
      title: 'Data Backups',
      items: [
        'Encrypted backups performed on a regular schedule.',
        'Ensures data is never lost and can be quickly restored.',
      ],
    },
    {
      title: 'Regular Security Testing',
      items: ['Frequent vulnerability scans and third-party audits.', 'Detect and fix weaknesses proactively.'],
    },
  ];

  defenseItems = [
    {
      title: 'Intrusion Detection',
      items: ['Automated monitoring systems detect suspicious activity in real time.'],
    },
    {
      title: 'Incident Response Plan',
      items: ['Structured process for isolation, investigation, remediation, and reporting.'],
    },
    {
      title: 'User Notification',
      items: ['Affected users notified within 48 hours with guidance and recommended actions.'],
    },
    {
      title: 'Continuous Improvement',
      items: ['All incidents are logged, analyzed, and used to strengthen defenses and resilience.'],
    },
    {
      title: 'Crisis Management & Coordination',
      items: ['Internal workflows and expert teams ready to act quickly during crises.'],
    },
  ];
}
